import React, { Component } from 'react'
import './css/CardPopUp.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faHotel, faHouseDamage } from '@fortawesome/free-solid-svg-icons'
class CardPopUp extends Component {
    constructor(props) {
        super();
    }

    render() {
        
        let cardType = '';
        let chances = [7, 28, 34]
        let community = [2, 17, 37]
        let property = [1, 3, 6, 8, 9, 11, 13, 14, 16, 18, 19, 21, 23, 
            24, 26, 27, 29, 31, 33, 36, 38, 39, 5, 15, 25, 35, 12, 22];
        if (chances.includes(this.props.id))
            cardType = "Chance"
        if (community.includes(this.props.id))
            cardType = "Community"
        if (property.includes(this.props.id))
            cardType = "Property"

        if(cardType=="Chance") {
            return (
                <div className="CardPopUp_Chance">
                    <div className="Chance_Community_Text">
                        <h1>{this.props.Name}</h1>
                        <p>{"Insert text here"}</p>
                    </div>   
                </div>
            );
        }
        else if (cardType=="Community") {
            return (
                <div className="CardPopUp_Community">
                    <div className="Chance_Community_Text">
                        <h1>{this.props.Name}</h1>
                        <p>{"Insert text here"}</p>
                    </div>   
                </div>
            );
        }
        else if (cardType=="Property") {
            return (
                <div className="CardPopUp_Property">
                    <div className="Property_Header" style={this.props.color}>
                        <h1>{this.props.Name}</h1>
                    </div>
                    <div className="Property_Price">
                        {/* big text centered */}
                        <p>{"Rent " + this.props.BuildingPrices[1]}</p>
                        <p>{"With 1 House $" + this.props.BuildingPrices[2]}</p>
                        <p>{"With 2 Houses $" + this.props.BuildingPrices[3]}</p>
                        <p>{"With 3 Houses $" + this.props.BuildingPrices[4]}</p>
                        <p>{"With 4 Houses $" + this.props.BuildingPrices[5]}</p>
                        <p>{"With Hotel $" + this.props.BuildingPrices[6]}</p>
                        <p>{"Morgage Value $" + this.props.BuildingPrices[7]}</p>
                        <p>{"Houses cost $" + this.props.BuildingPrices[8] + " each"}</p>
                        <p>{"Hotels, $" + this.props.BuildingPrices[8] + " plus 4 houses"}</p>
                    </div>
                    <div className="Property_Bottom_Text">
                        <p>{"If a player owns ALL the Lots of any Color-Group, the rent is Doubled on unimproved Lots in that group."}</p>
                    </div> 
                </div>
            );
        }
    }
}

export default CardPopUp;