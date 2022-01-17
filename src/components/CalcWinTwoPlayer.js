import React, { useEffect } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const CalcWinTwoPlayer = (props) => {
    
    
    useEffect(()=>{
        const {selection, selectionTwo, player, playerTwo, setWinState, setCalculating, setResultColor, dispatch} = props;
        const calculateWin = () => {
            let winner = "";
            let result = null;
            // console.log(selection);
            // console.log(selectionTwo);
            if (selection === selectionTwo) {
                result = "tie";
            } else {
                // handle wins and losses
                if (selection === "rock" && selectionTwo === "scissors") {
                    result = "win";
                    winner = player.name;
                    player.wins++;
                } else if (selection === "paper" && selectionTwo === "rock") {
                    result = "win";
                    winner = player.name;
                    player.wins++;
                } else if (selection === "scissors" && selectionTwo === "paper") {
                    result = "win";
                    winner = player.name;
                    player.wins++;
                } else {
                    result = "loss";
                    winner = playerTwo.name;
                    playerTwo.wins++;
                }
            }
    
            if (result === "tie") {
                // return <h1>It's a tie!</h1>
                setWinState("It's a tie!");
                setResultColor("black");
            } else {
                setWinState(`${winner} wins!`);
                if (result === "win") {
                    setResultColor("blue");
                } else {
                    setResultColor("red");
                }
            }
            setCalculating(false);
            dispatch({type: result});
        };
        calculateWin();
    }, [props]);

    return (
        <Segment>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </Segment>
    )

};

export default CalcWinTwoPlayer;