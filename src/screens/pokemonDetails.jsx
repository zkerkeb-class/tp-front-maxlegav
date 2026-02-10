import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { pokemonService } from '../services/pokemonService';
import Modal from '../components/Modal';
import PokemonForm from '../components/PokemonForm';
import './pokemonDetails.css';

const PokemonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await pokemonService.getPokemonById(id);
                setPokemon(data);
            } catch (err) {
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemon();
    }, [id]);

    const handleUpdate = async (formData) => {
        setIsSaving(true);
        try {
            const updatedPokemon = await pokemonService.updatePokemon(id, formData);
            setPokemon(updatedPokemon);
            setIsEditing(false);
        } catch (err) {
            console.error('Erreur:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await pokemonService.deletePokemon(id);
            navigate('/');
        } catch (err) {
            console.error('Erreur:', err);
        }
    };

    if (loading) {
        return <p className="loading">Chargement...</p>;
    }

    if (!pokemon) {
        return (
            <div className="error-page">
                <p>Pokemon non trouve</p>
                <Link to="/">Retour</Link>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="details-page">
                <h1>Modifier {pokemon.name?.french}</h1>
                <PokemonForm
                    initialData={pokemon}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditing(false)}
                    isLoading={isSaving}
                />
            </div>
        );
    }

    const primaryType = pokemon.type?.[0]?.toLowerCase() || 'normal';

    return (
        <div className="details-page">
            <div className="details-header">
                <Link to="/" className="back-link">← Retour</Link>
                <div className="details-actions">
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Modifier</button>
                    <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>Supprimer</button>
                </div>
            </div>

            <div className="pokemon-card-detail">
                <div className={`detail-banner poke-type-${primaryType}`}>
                    <h1>{pokemon.name?.french || pokemon.name?.english}</h1>
                    <span>#{String(pokemon.id).padStart(3, '0')}</span>
                </div>

                <div className="detail-content">
                    <div className="detail-image">
                        <img src={pokemon.image} alt={pokemon.name?.english} />
                    </div>

                    <div className="detail-types">
                        {pokemon.type?.map((type) => (
                            <span key={type} className={`type-badge poke-type-${type.toLowerCase()}`}>{type}</span>
                        ))}
                    </div>

                    <div className="detail-names">
                        <h3>Noms</h3>
                        {pokemon.name?.english && <p><strong>EN:</strong> {pokemon.name.english}</p>}
                        {pokemon.name?.french && <p><strong>FR:</strong> {pokemon.name.french}</p>}
                        {pokemon.name?.japanese && <p><strong>JP:</strong> {pokemon.name.japanese}</p>}
                        {pokemon.name?.chinese && <p><strong>CN:</strong> {pokemon.name.chinese}</p>}
                    </div>

                    <div className="detail-stats">
                        <h3>Stats</h3>
                        {pokemon.base && Object.entries(pokemon.base).map(([stat, value]) => (
                            <div key={stat} className="stat-row">
                                <span>{stat}</span>
                                <div className="stat-bar">
                                    <div className={`stat-fill poke-type-${primaryType}`} style={{ width: `${(value / 255) * 100}%` }}></div>
                                </div>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Supprimer ce Pokemon ?"
                onConfirm={handleDelete}
                confirmText="Supprimer"
                isDanger={true}
            >
                <p>Etes-vous sur de vouloir supprimer <strong>{pokemon.name?.french}</strong> ?</p>
            </Modal>
        </div>
    );
};

export default PokemonDetails;
