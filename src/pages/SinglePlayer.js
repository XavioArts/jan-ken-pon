import React, { useReducer, useState } from "react";
import { Button, Form, Image, Segment } from "semantic-ui-react";
import CalcWin from "../components/CalcWin";
import { CenterDiv, FlexDiv } from "../components/Styles";
import paper from "../images/Paper.jpg";
import rock from "../images/Rock.png";
import scissors from "../images/scissors.jpeg";

const SinglePlayer = () => {
    const [player, setPlayer] = useState(null);
    const [computer, setComputer] = useState(null);
    const [selection, setSelection] = useState(null);
    const [compChoice, setCompChoice] = useState(null);
    const [name, setName] = useState("");
    const [winState, setWinState] = useState("");
    const [resultColor, setResultColor] = useState("");
    const [calculating, setCalculating] = useState(false);

    const winReducer = (state, action) => {
        switch (action.type) {
            case "win":
                return { 
                    wins: state.wins + 1, 
                    total: state.total + 1,
                    losses: state.losses,
                    ties: state.ties,    
                };
            case "loss":
                return { 
                    losses: state.losses + 1, 
                    total: state.total + 1,
                    wins: state.wins,
                    ties: state.ties,
                };
            case "tie":
                return { 
                    ties: state.ties + 1, 
                    total: state.total + 1,
                    wins: state.wins,
                    losses: state.losses,
                };
            default:
                return console.log("error occurred");
        }
    }

    const [winTracker, dispatch] = useReducer(winReducer, {wins: 0, losses: 0, ties: 0, total: 0});

    const startGame = () => {
        let newPlayer = { name: name, wins: 0 }
        setPlayer(newPlayer);
        let comp = { name: "computer", wins: 0 }
        setComputer(comp);
    };

    const calcRatios = () => {
        let tieRatio = winTracker.ties / winTracker.total;
        console.log(tieRatio);
        console.log(winTracker.ties / winTracker.total)
        let winRatio = winTracker.wins / winTracker.total;
        let lossRatio = winTracker.losses / winTracker.total;
        return (
            <div>
                <p>Win ratio: {winRatio}</p>
                <p>Loss ratio: {lossRatio}</p>
                <p>Tie ratio: {tieRatio}</p>
            </div>
        )
    }

    const renderStatusBar = () => {
        return (
            <FlexDiv>
                <div>
                    <h2>{player.name}</h2>
                    <p>Wins: {player.wins}</p>
                </div>
                {calcRatios()}
                <div>
                    <h2>{computer.name}</h2>
                    <p>Wins: {computer.wins}</p>
                </div>
            </FlexDiv>
        );
    };

    const makeChoice = (id) => {
        let compChoices = ["rock", "paper", "scissors"];
        setCompChoice(compChoices[Math.floor((Math.random() * compChoices.length))]);
        if (id === 1) {
            setSelection("rock");
        } else if (id === 2) {
            setSelection("paper");
        } else if (id === 3) {
            setSelection("scissors");
        }
        setCalculating(true);
    };

    const reset = () => {
        setCompChoice(null);
        setSelection(null);
        setWinState("");
        setResultColor("");
    }

    return (
        <Segment>
            <CenterDiv>
                {!player && 
                <Form onSubmit={startGame}>
                    <Form.Field>
                        <label>Please enter your name</label>
                        <Form.Input fluid placeholder="Name.." value={name} onChange={(e)=>setName(e.target.value)} />
                    </Form.Field>
                    <Button type="submit">Start the Game!</Button>
                </Form>}
                {player && computer && 
                <div>
                    {renderStatusBar()}
                    {!selection &&
                    <>
                    <p>Start with the rock!</p>
                    <FlexDiv>
                        <Image src={rock} size="small" circular onClick={()=>makeChoice(1)} />
                        <Image src={paper} size="small" circular onClick={()=>makeChoice(2)} />
                        <Image src={scissors} size="small" circular onClick={()=>makeChoice(3)} />
                    </FlexDiv> 
                    </>}
                    {calculating && <CalcWin 
                    selection={selection} 
                    compChoice={compChoice} 
                    player={player} 
                    computer={computer} 
                    setWinState={setWinState} 
                    setCalculating={setCalculating}
                    setResultColor={setResultColor}
                    dispatch={dispatch} />}
                    {selection && compChoice && 
                    <div>
                        <h3>{player.name} - {selection}</h3>
                        <h3>{computer.name} - {compChoice}</h3>
                        {/* {calculateWin()} */}
                        <h1 style={{color: `${resultColor}`}} >{winState}</h1>
                        <Button onClick={reset}>Go again</Button>
                    </div>}
                </div>}
            </CenterDiv>
        </Segment>
    );
};

export default SinglePlayer;