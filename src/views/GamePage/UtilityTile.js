import React, { Component } from 'react';
import './css/tiles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb  } from '@fortawesome/free-solid-svg-icons'

class UtilityTile extends Component {
    constructor(props) {
        super();
    }

    render() {
        let bgStyle = null;
        let tileId = this.props.tileId;
        let playerId = this.props.player_pos;
        if(playerId==tileId) {
            bgStyle = {backgroundColor: this.props.player_color};
        }
        return (
            <div class="space utility electric-company" style={bgStyle}>
                <div class="container">
                    <div class="name">{this.props.propertyName}</div>
                    <FontAwesomeIcon className="drawing" icon={faLightbulb}></FontAwesomeIcon>
                    <div class="price">Price: {this.props.footerPrice}</div>
                </div>
            </div>
        );
    }

}

export default UtilityTile;