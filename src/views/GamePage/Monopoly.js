import React, { Component } from 'react';
import GameBoard from './GameBoard';
import Player from './Player.js';
import { Redirect } from 'react-router-dom';
import InformationBoard from './InformationBoard';
import './css/Monopoly.scss';

class Monopoly extends Component {
    constructor(props) {
        super(props);
        console.log("State is: " + this.props.location.state);
        // console.log(this.props.location.state.userObjects);
        // console.log(this.props.location.state.userObjects[0]);
        if (typeof this.props.location.state != "undefined")
            if (typeof this.props.location.state.userObjects != "undefined")
                this.state = {
                    readyToPlay: true,
                    userObjects: this.props.location.state.userObjects,
                    currentPlayerTurn: this.props.location.state.userObjects[0],
                    turnCount: 0
                };
                
            else 
                this.state = {
                    readyToPlay: false
                };
        else
            this.state = {
                readyToPlay: false
            };
        this.rollDice = this.rollDice.bind(this);
        this.nextPlayerTurn = this.nextPlayerTurn.bind(this);
    }

    nextPlayerTurn() {
        let currentPlayerTurn = this.state.currentPlayerTurn;
        let indexOfPlayer = this.state.userObjects.indexOf(currentPlayerTurn);
        console.log(indexOfPlayer + " and total players: " + this.state.userObjects.length);
        let numPlayers = this.state.userObjects.length;
        let nextPlayerIndex = null;
        if (indexOfPlayer == numPlayers - 1)
            nextPlayerIndex = 0;
        else  
            nextPlayerIndex = indexOfPlayer + 1;
            console.log(this.state.userObjects);
        console.log(this.state.userObjects[nextPlayerIndex]);
        this.setState({currentPlayerTurn: this.state.userObjects[nextPlayerIndex]});
    }

    rollDice(amountRolled) {
        let currentPlayerTurn = this.state.currentPlayerTurn;
        let indexOfPlayer = this.state.userObjects.indexOf(currentPlayerTurn);
        var stateCopy = Object.assign({},this.state);
        let newPos = currentPlayerTurn.getCurrentPosition() + amountRolled;
        if(newPos>39) {
            currentPlayerTurn.addToBalance(200);
            newPos-=39;
        }
        stateCopy.userObjects[indexOfPlayer].setCurrentPosition(newPos);
        stateCopy.userObjects[indexOfPlayer].setRolled(false);
        this.setState(stateCopy);
        console.log(this.state.userObjects);
        this.executeTurn(indexOfPlayer);
        /*console.log("Amount rolled: " + amountRolled);
        console.log(this.state.currentPlayerTurn);
        let currentPlayerTurn = this.state.currentPlayerTurn;
        let indexOfPlayer = this.state.userObjects.indexOf(currentPlayerTurn);
        let newPos = this.state.userObjects[indexOfPlayer].getCurrentPosition() + amountRolled;
        this.state.userObjects[indexOfPlayer].setCurrentPosition(newPos);
        // currentPlayerTurn: {...st.currentPlayerTurn,  currentPosition: st.currentPlayerTurn.currentPosition + amountRolled},
        // this.setState(st => ({
        //     userObjects: users
        // }));
        console.log(this.state.currentPlayerTurn);
        console.log(this.state.userObjects[0]);*/
    }
    executeTurn(indexOfPlayer) {

        this.nextPlayerTurn();
    }
    render() {
        return (
            <div className="Monopoly">
                {this.state.readyToPlay == false 
                ? <Redirect to='/' /> 
                : <div>
                    <GameBoard currentPlayer={this.state.currentPlayerTurn} />
                    <InformationBoard userObjects={this.state.userObjects} rollDice={this.rollDice} currentPlayer={this.state.currentPlayerTurn} />
                  </div> }
            </div>
        );
    }
}

export default Monopoly;