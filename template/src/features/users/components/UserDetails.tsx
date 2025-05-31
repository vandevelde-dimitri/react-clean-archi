import { useUser } from "../hooks/useUser";

interface Props {
    userId: string;
}

export const UserDetails = ({ userId }: Props) => {
    const { data: user, isLoading, isError } = useUser(userId);

    if (isLoading) return <p>Chargement...</p>;
    if (isError) return <p>Erreur lors du chargement</p>;
    if (!user) return <p>Utilisateur introuvable</p>;

    return (
        <div>
            <h2>Détails de l'utilisateur</h2>
            <p>Nom : {user.name}</p>
            <p>Email : {user.email}</p>
            {/* autres champs */}
        </div>
    );
};
