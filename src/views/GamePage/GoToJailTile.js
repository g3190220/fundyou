import React, { Component } from 'react'
import "./css/tiles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGavel  } from '@fortawesome/free-solid-svg-icons'

class GoToJailTile extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        let bgStyle = null;
        let tileId = this.props.tileId;
        let playerId = this.props.player_pos;
        if(playerId==tileId) {
            bgStyle = {backgroundColor: this.props.player_color};
        }
    return (
        <div class="GoToJailTile container" style={bgStyle}>
            <div class="name">Go To</div>
            <FontAwesomeIcon className="drawing" icon={faGavel} />
            <i class="drawing fa fa-gavel"></i>
            <div class="name">Jail</div>
        </div>

    )
    };
}
export default GoToJailTile;