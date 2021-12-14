
import './App.css';
import { CenterDiv } from './components/Styles';
import SinglePlayer from './pages/SinglePlayer';

function App() {
  return (
    <CenterDiv>
      <h1>Rock, Paper Scissors!</h1>
      <SinglePlayer />
    </CenterDiv>
  );
}

export default App;
