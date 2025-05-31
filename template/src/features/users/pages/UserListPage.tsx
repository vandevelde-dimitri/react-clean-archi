import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

const UserListPage = () => {
    const { data: users, isLoading, isError } = useUsers();

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur lors du chargement.</p>;

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul className="space-y-2">
                {users?.map((user: any) => (
                    <li
                        key={user.id}
                        className="p-4 border rounded hover:bg-gray-100"
                    >
                        <Link
                            to={`/user/${user.id}`}
                            className="text-blue-600 underline"
                        >
                            {user.lastname}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListPage;
