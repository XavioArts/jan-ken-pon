
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import { CenterDiv } from './components/Styles';
import Home from './pages/Home';
import SinglePlayer from './pages/SinglePlayer';

function App() {
  return (
    <CenterDiv>
      <h1>Rock, Paper, Scissors!</h1>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/single" element={<SinglePlayer/>} />
      </Routes>
    </CenterDiv>
  );
}

export default App;
