import React, { Component } from 'react'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import './css/InformationBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faHotel, faHouseDamage } from '@fortawesome/free-solid-svg-icons'
class InformationBoard extends Component {
    constructor(props) {
        super();
        this.rollDoneCallback = this.rollDoneCallback.bind(this);
        this.rollAll = this.rollAll.bind(this);
    }

    render() {
        let userObjects = this.props.userObjects;
        console.log(userObjects);
        const items = []
        for(const [index,value] of userObjects.entries()) {
            let bgStyle = {backgroundColor: value.getPieceName()};
            items.push(
            <div className="information_board_player" style={bgStyle}>
                <div className="player_name">
                    {value.getName()} <span> </span> <br></br>
                    <span><FontAwesomeIcon icon={faPuzzlePiece}/> </span>
                    <span class="InformationBoard-PieceName">{value.getPieceName()}</span>
                </div>
                <div className="player_bank">
                    <span>DD ${value.getBalance()} </span>
                    <FontAwesomeIcon icon={faHouseDamage}/>
                    <span> {value.getHouseCount()} </span>
                    <FontAwesomeIcon icon={faHotel}/>
                    <span> {value.getHotelCount()}</span>
                    <hr></hr>
                </div>
                <div className="player_position">

                </div>
            </div> 
            )}
        return (
            <div className="InformationBoard">
                <div className="flex-container">
                    {items}
                </div>
                <div className="InformationBoard-dieRoll">
                    <h2>{`${this.props.currentPlayer.getName()}'s turn!`}</h2>
                    <ReactDice
                    numDice={2}
                    rollDone={this.rollDoneCallback}
                    ref={dice => this.reactDice = dice}
                    faceColor="#000000"
                    dotColor="#ffffff"
                    disableIndividual={true}
                    />
                    <button onClick={this.rollAll} disabled={this.props.currentPlayer.hasRolled}>Roll</button>
                </div>
            </div>
        );
    }
    rollDoneCallback(num) {
        this.props.rollDice(num);
      }
    rollAll() {
        this.props.currentPlayer.setRolled(true);
        this.reactDice.rollAll();
    }
}

export default InformationBoard;