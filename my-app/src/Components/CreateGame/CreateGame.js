import React from 'react';
import { InputTopic } from './InputTopic.js';
import { InputPlayers } from './InputPlayers.js';
import { Link } from 'react-router-dom';
import '../../css/create-game.css';

class CreateGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionID: ""
        }
    }

    render(){
        return(
            <div>
                <InputTopic onInput={this.props.updateGame}/>
                <InputPlayers onInput={this.props.updateGame}/>
                <section class="createGameContainer">
                    <div class="text-center">
                        <Link to="/admin-game"><button id="btn-start" class="btn btn-primary btn-lg mt-2 mx-auto">Begin Debate</button></Link>
                    </div>
                </section>
            </div>
        )
    }
}

export default CreateGame;