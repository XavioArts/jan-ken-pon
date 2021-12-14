import React, { useEffect } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const CalcWin = (props) => {
    const {selection, compChoice, player, computer, setWinState, setCalculating} = props;

    const calculateWin = () => {
        let winner = "";
        let result = null;
        // console.log(selection);
        // console.log(compChoice);
        if (selection === compChoice) {
            result = "tie";
        } else {
            // handle wins and losses
            if (selection === "rock" && compChoice === "scissors") {
                result = "win";
                winner = player.name;
                player.wins++;
            } else if (selection === "paper" && compChoice === "rock") {
                result = "win";
                winner = player.name;
                player.wins++;
            } else if (selection === "scissors" && compChoice === "paper") {
                result = "win";
                winner = player.name;
                player.wins++;
            } else {
                result = "loss";
                winner = computer.name;
                computer.wins++;
            }
        }

        if (result === "tie") {
            // return <h1>It's a tie!</h1>
            setWinState("It's a tie!");
        } else {
            setWinState(`${winner} wins!`);
        }
        setCalculating(false);
    };

    useEffect(()=>{
        calculateWin();
    }, []);

    return (
        <Segment>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </Segment>
    )

};

export default CalcWin;