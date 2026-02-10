import { useState, useEffect } from 'react';
import './index.css';

const POKEMON_TYPES = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic',
  'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
];

const PokemonForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: { english: '', french: '', japanese: '', chinese: '' },
    type: [],
    base: { HP: 50, Attack: 50, Defense: 50, SpecialAttack: 50, SpecialDefense: 50, Speed: 50 },
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || { english: '', french: '', japanese: '', chinese: '' },
        type: initialData.type || [],
        base: initialData.base || { HP: 50, Attack: 50, Defense: 50, SpecialAttack: 50, SpecialDefense: 50, Speed: 50 },
        image: initialData.image || ''
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (lang, value) => {
    setFormData(prev => ({
      ...prev,
      name: { ...prev.name, [lang]: value }
    }));
  };

  const handleBaseChange = (stat, value) => {
    setFormData(prev => ({
      ...prev,
      base: { ...prev.base, [stat]: parseInt(value) || 0 }
    }));
  };

  const handleTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type].slice(0, 2)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="pokemon-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Infos de base</h3>
        <div className="form-row">
          <label>
            ID:
            <input
              type="number"
              value={formData.id}
              onChange={(e) => handleChange('id', parseInt(e.target.value) || '')}
              disabled={!!initialData}
              required
            />
          </label>
          <label>
            URL Image:
            <input
              type="text"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="http://localhost:3000/assets/pokemons/1.png"
              required
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>Noms</h3>
        <div className="form-row">
          <label>
            Anglais:
            <input
              type="text"
              value={formData.name.english}
              onChange={(e) => handleNameChange('english', e.target.value)}
            />
          </label>
          <label>
            Francais:
            <input
              type="text"
              value={formData.name.french}
              onChange={(e) => handleNameChange('french', e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Japonais:
            <input
              type="text"
              value={formData.name.japanese}
              onChange={(e) => handleNameChange('japanese', e.target.value)}
            />
          </label>
          <label>
            Chinois:
            <input
              type="text"
              value={formData.name.chinese}
              onChange={(e) => handleNameChange('chinese', e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>Types (max 2)</h3>
        <div className="type-grid">
          {POKEMON_TYPES.map(type => (
            <button
              key={type}
              type="button"
              className={`type-btn poke-type-${type.toLowerCase()} ${formData.type.includes(type) ? 'selected' : ''}`}
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3>Stats de base</h3>
        <div className="stats-grid">
          {Object.entries(formData.base).map(([stat, value]) => (
            <label key={stat}>
              {stat}:
              <input
                type="number"
                min="0"
                max="255"
                value={value}
                onChange={(e) => handleBaseChange(stat, e.target.value)}
                required
              />
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} disabled={isLoading}>
          Annuler
        </button>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Sauvegarde...' : (initialData ? 'Modifier' : 'Creer')}
        </button>
      </div>
    </form>
  );
};

export default PokemonForm;
