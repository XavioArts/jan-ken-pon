import React, { useReducer, useState } from "react";
import { Button, Form, Icon, Image, Segment } from "semantic-ui-react";
import CalcWinTwoPlayer from "../components/CalcWinTwoPlayer";
import { CenterDiv, FlexDiv } from "../components/Styles";
import paper from "../images/Paper.jpg";
import rock from "../images/Rock.png";
import scissors from "../images/scissors.jpeg";

const TwoPlayer = () => {
    const [player, setPlayer] = useState(null);
    const [playerTwo, setPlayerTwo] = useState(null);
    const [selection, setSelection] = useState(null);
    const [selectionTwo, setSelectionTwo] = useState(null);
    const [name, setName] = useState("");
    const [nameTwo, setNameTwo] = useState("");
    const [winState, setWinState] = useState("");
    const [resultColor, setResultColor] = useState("");
    const [calculating, setCalculating] = useState(false);
    
    // const [winRatio, setWinRatio] = useState(0);

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
        let newPlayerTwo = { name: nameTwo, wins: 0 }
        setPlayerTwo(newPlayerTwo);
    };

    const calcRatios = () => {
        let winRatio;
        let lossRatio;
        if (winTracker.total === 0) {
            winRatio = 0;
            lossRatio = 0;
        } else {
            winRatio = winTracker.wins / winTracker.total;
            lossRatio = winTracker.losses / winTracker.total;
        }
        return (
            <div>
                <p>P1 win ratio: {winRatio}</p>
                <p>P2 win ratio: {lossRatio}</p>
            </div>
        )
    }

    const renderStatusBar = () => {
        return (
            <FlexDiv>
                <FlexDiv>
                    <Icon name="chess knight" color="blue" size="huge" />
                <div>
                    <h2>{player.name}</h2>
                    <p>Wins: {player.wins}</p>
                </div>
                </FlexDiv>
                {calcRatios()}
                <FlexDiv>
                <div>
                    <h2>{playerTwo.name}</h2>
                    <p>Wins: {playerTwo.wins}</p>
                </div>
                    <Icon name="chess rook" color="red" size="huge" />
                </FlexDiv>
            </FlexDiv>
        );
    };

    const makeChoiceP1 = (id) => {
        if (id === 1) {
            setSelection("rock");
        } else if (id === 2) {
            setSelection("paper");
        } else if (id === 3) {
            setSelection("scissors");
        }
        // setCalculating(true);
    };
    const makeChoiceP2 = (id) => {
        if (id === 1) {
            setSelectionTwo("rock");
        } else if (id === 2) {
            setSelectionTwo("paper");
        } else if (id === 3) {
            setSelectionTwo("scissors");
        }
        setCalculating(true);
    };

    const reset = () => {
        setSelection(null);
        setSelectionTwo(null);
        setWinState("");
        setResultColor("");
    }

    return (
        <Segment>
            <CenterDiv>
                {!player && !playerTwo && 
                <Form onSubmit={startGame}>
                    <Form.Field>
                        <label>Enter Player 1 name</label>
                        <Form.Input fluid placeholder="Name.." value={name} onChange={(e)=>setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Enter Player 2 name</label>
                        <Form.Input fluid placeholder="Name.." value={nameTwo} onChange={(e)=>setNameTwo(e.target.value)} />
                    </Form.Field>
                    <Button type="submit">Start the Game!</Button>
                </Form>}
                {player && playerTwo && 
                <div>
                    {renderStatusBar()}
                    {!selection && !selectionTwo &&
                    <>
                    <p>Go Player 1!</p>
                    <FlexDiv>
                        <Image src={rock} size="small" circular onClick={()=>makeChoiceP1(1)} />
                        <Image src={paper} size="small" circular onClick={()=>makeChoiceP1(2)} />
                        <Image src={scissors} size="small" circular onClick={()=>makeChoiceP1(3)} />
                    </FlexDiv> 
                    </>}
                    {selection && !selectionTwo && 
                    <>
                    <p>Now, go Player 2!</p>
                    <FlexDiv>
                        <Image src={rock} size="small" circular onClick={()=>makeChoiceP2(1)} />
                        <Image src={paper} size="small" circular onClick={()=>makeChoiceP2(2)} />
                        <Image src={scissors} size="small" circular onClick={()=>makeChoiceP2(3)} />
                    </FlexDiv> 
                    </>
                    }
                    {calculating && <CalcWinTwoPlayer 
                    selection={selection} 
                    selectionTwo={selectionTwo} 
                    player={player} 
                    playerTwo={playerTwo} 
                    setWinState={setWinState} 
                    setCalculating={setCalculating}
                    setResultColor={setResultColor}
                    dispatch={dispatch} />}
                    {selection && selectionTwo && winState && 
                    <div>
                        <h3 style={{color: "blue"}} >{player.name} - {selection}</h3>
                        <h3 style={{color: "red"}} >{playerTwo.name} - {selectionTwo}</h3>
                        <h1 style={{color: `${resultColor}`}} >{winState}</h1>
                        <Button onClick={reset}>Go again</Button>
                    </div>}
                </div>}
            </CenterDiv>
        </Segment>
    );
};

export default TwoPlayer;