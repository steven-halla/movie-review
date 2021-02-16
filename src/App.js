import { Router } from '@reach/router';
import Home from './views/Home.html';
// import CriticView from './views/CriticView';
// import MovieView from './views/MovieView';
// import Login from './views/Login';
// import Register from './views/Register';



function App() {
  return(
    <div className="App">
      <Router>
        <Home path="/"  />
        <CriticView path="/critic" />
        <Login path="/login" />
        <MovieView path="/movie"/>
        <Register path="/register"/>
      </Router>
    </div>
  );
}

export default App;

