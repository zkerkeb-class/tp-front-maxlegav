import { useState } from "react";
import { useNavigate } from "react-router";
import PokeCard from "../pokeCard";
import "./index.css";

const CARDS_PER_PAGE = 10;

const Classeur = ({
  pokemons,
  currentPage,
  totalPages,
  onPageChange,
  hasPrevPage,
  hasNextPage,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (pokemonId) => {
    navigate(`/pokemonDetails/${pokemonId}`);
  };

  const leftPage = pokemons.slice(0, CARDS_PER_PAGE);
  const rightPage = pokemons.slice(CARDS_PER_PAGE, CARDS_PER_PAGE * 2);

  const handlePageTurn = (direction) => {
    if (isFlipping) return;

    setFlipDirection(direction);
    setIsFlipping(true);

    setTimeout(() => {
      if (direction === "next" && hasNextPage) {
        onPageChange(currentPage + 1);
      } else if (direction === "prev" && hasPrevPage) {
        onPageChange(currentPage - 1);
      }
      setIsFlipping(false);
      setFlipDirection(null);
    }, 500);
  };

  const leftPageNum = (currentPage - 1) * 2 + 1;
  const rightPageNum = leftPageNum + 1;

  return (
    <div className="book-container">
      
      <button
        className="page-turn-btn prev"
        onClick={() => handlePageTurn("prev")}
        disabled={!hasPrevPage || isFlipping}
        title="Page précédente"
      >
        ◀
      </button>

      
      <div className="book-open">
       
        <div
          className={`book-page page-left ${isFlipping ? `flipping-${flipDirection}` : ""}`}
        >
          <div className="page-content">
            <div className="card-grid">
              {leftPage.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="card-slot"
                  onClick={() => handleCardClick(pokemon.id)}
                >
                  <PokeCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          </div>
          <div className="page-number">— {leftPageNum} —</div>
        </div>

       
        <div className="book-spine">
          <div className="spine-ring"></div>
          <div className="spine-ring"></div>
          <div className="spine-ring"></div>
          <div className="spine-ring"></div>
          <div className="spine-ring"></div>
          <div className="spine-ring"></div>
        </div>

        
        <div
          className={`book-page page-right ${isFlipping ? `flipping-${flipDirection}` : ""}`}
        >
          <div className="page-content">
            <div className="card-grid">
              {rightPage.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="card-slot"
                  onClick={() => handleCardClick(pokemon.id)}
                >
                  <PokeCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          </div>
          <div className="page-number">— {rightPageNum} —</div>
        </div>
      </div>

    
      <button
        className="page-turn-btn next"
        onClick={() => handlePageTurn("next")}
        disabled={!hasNextPage || isFlipping}
        title="Page suivante"
      >
        ▶
      </button>
    </div>
  );
};

export default Classeur;
