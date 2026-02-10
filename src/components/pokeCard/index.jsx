import './index.css';
import PokeTitle from "./pokeTitle";
import PokeImage from "./pokeImage";

const PokeCard = ({ pokemon }) => {
    const primaryType = pokemon.type?.[0]?.toLowerCase() || 'normal';

    return (
        <div className="poke-card">
            <div className={`poke-card-header poke-type-${primaryType}`}>
                <PokeTitle name={pokemon.name?.french || pokemon.name?.english || 'Inconnu'} />
                <span className="poke-id">#{String(pokemon.id).padStart(3, '0')}</span>
            </div>
            <div className="poke-image-background">
                <PokeImage imageUrl={pokemon.image} />
            </div>
            <div className="poke-types">
                {pokemon.type?.map((type) => (
                    <span key={type} className={`poke-type-badge poke-type-${type.toLowerCase()}`}>
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default PokeCard;
