import RoutesList from './Routes';
import NavBar from './NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <RoutesList />
      </main>
    </div>
  );
}

export default App;
