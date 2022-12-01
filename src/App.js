import logo from './logo.svg';
import './App.scss';

import Ship from './components/Ship'
import Gameboard from './components/Gameboard'

function App() {
  return (
    <div className="App">
      <div className="drag-and-drop">
        <Ship health='5'></Ship>
      </div>
      <Gameboard size="50"/>
      <p className="vs">VS</p>
      <Gameboard size="50"/>
    </div>
  );
}

export default App;
