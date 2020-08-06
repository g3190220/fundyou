import React, { Component } from 'react'
import "./css/tiles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrownOpen  } from '@fortawesome/free-solid-svg-icons'

class JailTile extends Component {
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
        <div class="space corner jail" style={bgStyle}>
           <div class="just">Just</div>
			<div class="drawing">
				<div class="container">
					<div class="name">In</div>
					<div class="window">
						<div class="bar"></div>
						<div class="bar"></div>
						<div class="bar"></div>
						<FontAwesomeIcon className="person" icon={faFrownOpen} />
						{/* <i class="person fa fa-frown-o"></i> */}
					</div>
					<div class="name">Jail</div>
				</div>
			</div>
			<div class="visiting">Visiting</div>
        </div>
    )
    };
}
export default JailTile;