import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import PokemonForm from '../components/PokemonForm';
import { pokemonService } from '../services/pokemonService';
import './CreatePokemon.css';

const CreatePokemon = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            await pokemonService.createPokemon(formData);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-page">
            <div className="create-header">
                <Link to="/" className="back-link">← Retour</Link>
                <h1>Creer un Pokemon</h1>
            </div>
            {error && <div className="error-message">{error}</div>}
            <PokemonForm
                onSubmit={handleSubmit}
                onCancel={() => navigate('/')}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CreatePokemon;
