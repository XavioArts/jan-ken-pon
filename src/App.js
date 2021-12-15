
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import { CenterDiv } from './components/Styles';
import Home from './pages/Home';
import SinglePlayer from './pages/SinglePlayer';
import TwoPlayer from './pages/TwoPlayer';

function App() {
  return (
    <CenterDiv>
      <h1>Rock, Paper, Scissors!</h1>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/single" element={<SinglePlayer/>} />
        <Route path="/two-player" element={<TwoPlayer/>} />
      </Routes>
    </CenterDiv>
  );
}

export default App;
