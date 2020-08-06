import React, { Component } from 'react';
import './css/tiles.scss';

class HouseTile extends Component {
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
        let posStyle = ""
        if(this.props.tileId<10) {
            posStyle = "bottom"
        }
        else if(this.props.tileId>10 && this.props.tileId<20) {
            posStyle = "left";
        }
        else if(this.props.tileId>20 && this.props.tileId<30) {
            posStyle = "top";
        }
        else {
            posStyle = "right";
        }
        let color = "color-bar" + " " + this.props.colorGroup;
        return (
            <div className="HouseTile space property" style={bgStyle}>
                <div className="container">
                    <div className={color}></div>
                    <div class="name">{this.props.propertyName}</div>
                    <div class="price">{this.props.footerPrice}</div>
                </div>
            </div>
        );
    };

}

export default HouseTile; // Export the name of the component!!!