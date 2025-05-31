import { useParams } from "react-router-dom";
import { UserDetails } from "../components/UserDetails";

export const UserPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Fiche utilisateur</h1>
            {id ? <UserDetails userId={id} /> : <p>ID manquant</p>}
        </div>
    );
};
