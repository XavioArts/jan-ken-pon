import React, { useState } from "react";
import { Button, Form, Image, Segment } from "semantic-ui-react";
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

    const startGame = () => {
        let newPlayer = { name: name, wins: 0 }
        setPlayer(newPlayer);
        let comp = { name: "computer", wins: 0 }
        setComputer(comp);
    };

    const renderStatusBar = () => {
        return (
            <FlexDiv>
                <div>
                    <h2>{player.name}</h2>
                    <p>Wins: {player.wins}</p>
                </div>
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
    };

    const reset = () => {
        setCompChoice(null);
        setSelection(null);
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
                        <Image src={paper} size="small" circular />
                        <Image src={scissors} size="small" circular />
                    </FlexDiv> 
                    </>}
                    {/* calculating/loading here */}
                    {selection && compChoice && 
                    <div>
                        <h3>{player.name} - {selection}</h3>
                        <h3>{computer.name} - {compChoice}</h3>
                        <Button onClick={reset}>Go again</Button>
                    </div>
                        /* display results, here will have button to go again */}
                </div>}
            </CenterDiv>
        </Segment>
    );
};

export default SinglePlayer;