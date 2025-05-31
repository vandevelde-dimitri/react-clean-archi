#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// ----- PARSE CLI ARGS -----
const args = process.argv.slice(2);
const featureName = args[0];
const isPublic = args.includes("--public");
const isPrivate = args.includes("--private");
const shouldDelete = args.includes("--delete");

if (!featureName) {
    console.error("❌ Please provide a feature name.");
    process.exit(1);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function askRouteType() {
    return new Promise((resolve) => {
        if (isPublic) return resolve(false);
        if (isPrivate) return resolve(true);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(
            "🔐 Do you want to make this route private? (y/n): ",
            (answer) => {
                rl.close();
                resolve(answer.trim().toLowerCase() === "y");
            }
        );
    });
}

// ----- DELETE FEATURE -----
function removeRouteFromRouter(featureName) {
    const routerPath = path.join(
        process.cwd(),
        "src",
        "app",
        "router",
        "AppRoutes.tsx"
    );

    if (!fs.existsSync(routerPath)) {
        console.error("❌ AppRoutes.tsx not found.");
        return;
    }

    const pageComponent = `${capitalize(featureName)}Page`;
    const importRegex = new RegExp(
        `^import\\s+${pageComponent}\\s+from\\s+["'][^"']+["'];\\n?`,
        "gm"
    );
    const routeRegex = new RegExp(
        `\\s*<Route\\s+path="/${featureName}"\\s+element={<${pageComponent} />}\\s*/>\\n?`,
        "gm"
    );

    let content = fs.readFileSync(routerPath, "utf8");

    const importRemoved = content.replace(importRegex, "");
    const routeRemoved = importRemoved.replace(routeRegex, "");

    if (routeRemoved !== content) {
        fs.writeFileSync(routerPath, routeRemoved, "utf8");
        console.log(`\x1b[34m✓ src/router/AppRoutes.tsx modified.\x1b[0m`);
    } else {
        console.log("ℹ️ No matching route or import found in AppRoutes.tsx");
    }
}

if (shouldDelete) {
    const baseDir = path.join(process.cwd(), "src", "features", featureName);
    if (!fs.existsSync(baseDir)) {
        console.error(`❌ Feature "${featureName}" does not exist.`);
        process.exit(1);
    }
    fs.rmSync(baseDir, { recursive: true, force: true });
    removeRouteFromRouter(featureName);
    console.log(`\x1b[31m✓ Feature "${featureName}" deleted.\x1b[0m`);
    process.exit(0);
}

// ----- CREATE DIRECTORIES -----
const baseDir = path.join(process.cwd(), "src", "features", featureName);
if (fs.existsSync(baseDir)) {
    console.error(`❌ Feature "${featureName}" already exists.`);
    process.exit(1);
}

const subDirs = [
    "components",
    "data",
    "hooks",
    "pages",
    "types",
    "services",
    "store",
];

subDirs.forEach((sub) => {
    const dir = path.join(baseDir, sub);
    fs.mkdirSync(dir, { recursive: true });
    console.log(
        `\x1b[32m✓ ${path.relative(process.cwd(), dir)} created.\x1b[0m`
    );

    if (sub === "types") {
        fs.writeFileSync(
            path.join(dir, `${featureName}.types.ts`),
            `// Define types for ${featureName}
export interface ${capitalize(featureName)} {
    id: string;
}
`
        );
    }

    if (sub === "data") {
        fs.writeFileSync(
            path.join(dir, `mock${capitalize(featureName)}s.ts`),
            `// Mock data for ${featureName}
import { faker } from "@faker-js/faker";

export const mock${capitalize(
                featureName
            )}s = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
}));
`
        );
    }

    if (sub === "pages") {
        fs.writeFileSync(
            path.join(dir, `${featureName}Page.tsx`),
            `// Page for ${featureName}
export default function ${capitalize(featureName)}Page() {
    return <div>${capitalize(featureName)} Page</div>;
}
`
        );
    }

    if (sub === "services") {
        fs.writeFileSync(
            path.join(dir, `${featureName}Service.ts`),
            `import { useApi } from "../../../shared/api/useApi";
import { mock${capitalize(featureName)}s } from "../data/mock${capitalize(
                featureName
            )}s";
import type { ${capitalize(featureName)} } from "../types/${featureName}.types";

const api = useApi();
const USE_FAKE_API = import.meta.env.VITE_USE_FAKE_API === "true";

export const getAll${capitalize(featureName)}s = async (): Promise<${capitalize(
                featureName
            )}[]> => {
    if (USE_FAKE_API) {
        return mock${capitalize(featureName)}s;
    } else {
        const { data } = await api.get<${capitalize(
            featureName
        )}[]>("${featureName}");
        return data;
    }
};

export const get${capitalize(
                featureName
            )} = async (id: string): Promise<${capitalize(featureName)}> => {
    if (USE_FAKE_API) {
        const item = mock${capitalize(featureName)}s.find((u) => u.id === id);
        if (!item) {
            throw new Error(\`${capitalize(
                featureName
            )} with id \${id} not found\`);
        }
        return item;
    } else {
        const { data } = await api.get<${capitalize(
            featureName
        )}>(\`${featureName}/\${id}\`);
        return data;
    }
};
`
        );
    }

    if (sub === "hooks") {
        fs.writeFileSync(
            path.join(dir, `use${capitalize(featureName)}.tsx`),
            `import { useQuery } from "@tanstack/react-query";
import { get${capitalize(
                featureName
            )} } from "../services/${featureName}Service";

export const use${capitalize(featureName)} = (id: string) => {
    return useQuery({
        queryKey: ["${featureName}", id],
        queryFn: () => get${capitalize(featureName)}(id),
        enabled: !!id,
    });
};
`
        );
        fs.writeFileSync(
            path.join(dir, `use${capitalize(featureName)}s.tsx`),
            `import { useQuery } from "@tanstack/react-query";
import { getAll${capitalize(
                featureName
            )}s } from "../services/${featureName}Service";

export const use${capitalize(featureName)}s = () => {
    return useQuery({
        queryKey: ["${featureName}s"],
        queryFn: () => getAll${capitalize(featureName)}s(),
    });
};
`
        );
    }
});

// ----- ROUTER MODIFICATIONS -----
function addRouteToRouter(featureName, isPrivate) {
    const routerPath = path.join(
        process.cwd(),
        "src",
        "app",
        "router",
        "AppRoutes.tsx"
    );

    if (!fs.existsSync(routerPath)) {
        console.error("❌ AppRoutes.tsx not found.");
        return;
    }

    const pageComponent = `${capitalize(featureName)}Page`;
    const importPath = `../../features/${featureName}/pages/${featureName}Page`;
    const importStatement = `import ${pageComponent} from "${importPath}";\n`;

    let content = fs.readFileSync(routerPath, "utf8");

    if (!content.includes(importStatement)) {
        content = importStatement + content;
    }

    const marker = isPrivate
        ? "// ... other private routes"
        : "// ... other public routes";

    const route = `\n                <Route path="/${featureName}" element={<${pageComponent} />} />`;

    if (content.includes(route)) {
        console.log("ℹ️ Route already exists in AppRoutes.tsx");
    } else if (content.includes(marker)) {
        content = content.replace(
            marker,
            `${route}\n                ${marker}`
        );
        console.log(`\x1b[34m✓ src/router/AppRoutes.tsx modified.\x1b[0m`);
    } else {
        console.warn(`⚠️ Marker '${marker}' not found. Route not inserted.`);
    }

    fs.writeFileSync(routerPath, content, "utf8");
}

// ----- MAIN EXECUTION -----
(async () => {
    const isPrivateResolved = await askRouteType();
    addRouteToRouter(featureName, isPrivateResolved);
})();
