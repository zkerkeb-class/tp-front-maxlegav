import { Link } from 'react-router'
import './App.css'
import Pokelist from './components/pokelist'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Classeur Pokemon</h1>
        <Link to="/create" className="create-btn">+ Nouveau Pokemon</Link>
      </header>
      <Pokelist />
    </div>
  )
}

export default App
