import { useState, useEffect } from "react";
import Classeur from "../classeur";
import { pokemonService } from "../../services/pokemonService";
import "./index.css";

const PokeList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchPokemons = async (page = 1) => {
    setLoading(true);
    try {
      const response = await pokemonService.getPokemons(page, 20);
      setPokemons(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(1);
  }, []);

  const handlePageChange = (page) => {
    fetchPokemons(page);
  };

  if (loading) {
    return <p className="loading">Chargement...</p>;
  }

  return (
    <div className="poke-list-container">
      <Classeur
        pokemons={pokemons}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPrevPage={pagination.hasPrevPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PokeList;
