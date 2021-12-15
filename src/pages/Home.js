import React from "react";
import { useNavigate } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";

const Home = () => {

    const navigate = useNavigate();

    return (
        <Segment>
            <h1>Play Single Player</h1>
            <Button onClick={()=>navigate("/single")} >Play</Button>
            <h1>Play Two Player</h1>
            <Button>Play</Button>
        </Segment>
    );
};

export default Home;