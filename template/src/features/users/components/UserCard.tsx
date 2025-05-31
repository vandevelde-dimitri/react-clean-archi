import type { User } from "../types/user.types";

interface Props {
    user: User;
}

export const UserCard = ({ user }: Props) => (
    <div className="border p-2 rounded">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
    </div>
);
