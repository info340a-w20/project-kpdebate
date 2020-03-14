import React from 'react';
import AudienceJoin from './AudienceJoin.js';
import Player from './Player.js';
import Timer from './Timer.js';
import Vote from './Vote.js';
import '../../css/game.css';

class Game extends React.Component {
    render() {
        return(
            <div>
                <Player/>
                <Timer/>
                <Vote/>
                <AudienceJoin/>
            </div>
        );
    }
}

export default Game;