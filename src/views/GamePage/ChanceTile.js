import React, { Component } from 'react'
import './css/tiles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faCube } from '@fortawesome/free-solid-svg-icons'

class ChanceTile extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        let tileName = this.props.propertyName;
        let bgStyle = null;
        let tileId = this.props.tileId;
        let playerId = this.props.player_pos;
        if(playerId==tileId) {
            bgStyle = {backgroundColor: this.props.player_color};
        }
        if(tileName=="Chance") {
            return (
                <div className="space chance" style={bgStyle}>
                    <div className="container">
                        <div className="name">{this.props.propertyName}</div>
                        <FontAwesomeIcon className="drawing" icon={faQuestion} />
                        {/* <i class="drawing fa fa-question"></i> */}
                    </div>
                </div>

            );
        }
        else {
            return (
                <div className="space community-chest" style={bgStyle}>
                    <div className="container">
                        <div className="name">Community Chest</div>
                        <FontAwesomeIcon className="drawing" icon={faCube} />
                        {/* <i className="drawing fa fa-cube"></i> */}
                        <div className="instructions">Follow instructions on top card</div>
                    </div>
                </div>
            );
        }
    };

}

export default ChanceTile;