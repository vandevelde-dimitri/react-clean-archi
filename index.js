#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
    console.error("❌ Please provide a project name.");
    process.exit(1);
}

const templatePath = path.join(__dirname, "template");
const targetPath = path.join(process.cwd(), projectName);

fs.cpSync(templatePath, targetPath, { recursive: true });

console.log(`✅ Project created in ${projectName}`);
console.log(`📦 Installing dependencies...`);

execSync("npm install", { cwd: targetPath, stdio: "inherit" });

console.log(`🎉 Done! Start with:`);
console.log(`cd ${projectName} && npm run dev`);
