import React, { Component } from 'react';
import './css/tiles.scss';
import ChanceTile from "./ChanceTile.js";
import GoTile from "./GoTile.js";
import FreeParkingTile from "./FreeParkingTile.js";
import GoToJailTile from "./GoToJailTile.js";
import JailTile from "./JailTile.js";
import HouseTile from "./HouseTile.js";
import TaxTile from "./TaxTile.js";
import Color from "./Constants.js";
import DiningTile from "./DiningTile";
import UtilityTile from "./UtilityTile";
import CardPopUp from "./CardPopUp.js";
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';



class GameBoard extends Component {
    constructor(props) {
        super();
    }

    render() {
        let currentPlayer = this.props.currentPlayer;
        console.log(currentPlayer);
        let player_pos = currentPlayer.getCurrentPosition();
        let player_color = currentPlayer.getPieceName();
        console.log("GameBoard is getting rendered! Player_pos: " + player_pos);
        return(
            <div class="table">
                <div className="board">
                    <div className="center">
                        <div class="community-chest-deck">
                            <h2 class="label">Community Chest</h2>
                            <div class="deck"></div>
			            </div>
			            <h1 class="title">SBU MONOPOLY</h1>
                        <div class="chance-deck">
                            <h2 class="label">Chance</h2>
                            <div class="deck"></div>
                        </div>
                    </div>
                    <GoTile propertyName="SAC Loop" tileId={0} tileInstruction="Collect $200 as you pass go" player_pos={player_pos} player_color={player_color}/>
                    <div className="row horizontal-row bottom-row">
                    <HouseTile propertyName="Melville Library" tileId={9} colorGroup="light-blue" footerPrice="$120" player_pos={player_pos} player_color={player_color} />  
                    <HouseTile propertyName="Frey Hall" tileId={8} colorGroup="light-blue" footerPrice="$100" player_pos={player_pos} player_color={player_color} />
                    <ChanceTile propertyName="Chance" tileId={7} player_pos={player_pos} player_color={player_color}/>
                    <HouseTile propertyName="Harriman Hall" tileId={6} colorGroup="light-blue"  footerPrice="$100" player_pos={player_pos} player_color={player_color} />
                    <DiningTile propertyName="East Side Dining" tileId={5} footerPrice="$200" />
                    <TaxTile propertyName="Housing Fee" tileId={4} footerPrice="$200" player_pos={player_pos} player_color={player_color}/>
                    <HouseTile propertyName="Javits Center" tileId={3} colorGroup="dark-purple"  footerPrice="$60" player_pos={player_pos} player_color={player_color} />
                    <ChanceTile propertyName="Community Chest" tileId={2} player_pos={player_pos} player_color={player_color}/>
                    <HouseTile propertyName="Earth & Space Sciences" tileId={1} colorGroup="dark-purple" footerPrice="$60" player_pos={player_pos} player_color={player_color} />
                    </div>
                    <JailTile propertyName="Jail" tileId={10} player_pos={player_pos} player_color={player_color}/>
                    <div className="row vertical-row left-row">
                        <HouseTile propertyName="Light Engineering" tileId={19} colorGroup="orange" footerPrice="$200" player_pos={player_pos} player_color={player_color} />
                        <HouseTile propertyName="New Comp Sci" tileId={18} colorGroup="orange" footerPrice="$180" player_pos={player_pos} player_color={player_color}/>
                        <ChanceTile propertyName="Community Chest" tileId={17} player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Old Comp Sci" tileId={16} colorGroup="orange" footerPrice="$180" player_pos={player_pos} player_color={player_color}/>
                        <DiningTile propertyName="West Side Dining" tileId={15} footerPrice="$200" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="James College" tileId={14} colorGroup="purple" footerPrice="$160" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Langmuir College" tileId={13} colorGroup="purple" footerPrice="$140" player_pos={player_pos} player_color={player_color} />
                        <UtilityTile propertyName="SBU Buses" tileId={12} footerPrice="$200" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Benedict College" tileId={11} colorGroup="purple" footerPrice="$140" player_pos={player_pos} player_color={player_color} />
                    </div>
                    <div className="space corner free-parking">
                        <FreeParkingTile propertyName="Free Parking" tileId={20} player_pos={player_pos} player_color={player_color}/>
                    </div>
                    <div className="row horizontal-row top-row">
                        <HouseTile propertyName="Cardozo College" tileId={21} colorGroup="red" footerPrice="$220" player_pos={player_pos} player_color={player_color} />
                        <ChanceTile propertyName="Chance" tileId={22}/>
                        <HouseTile propertyName="Mount College" tileId={23} colorGroup="red" footerPrice="$220" player_pos={player_pos} player_color={player_color} />
                        <HouseTile propertyName="Gershwin College" tileId={24} colorGroup="red" footerPrice="$240" player_pos={player_pos} player_color={player_color}/>
                        <DiningTile propertyName="Roth Cafe" tileId={25} footerPrice="$200" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Humanities" tileId={26} colorGroup="yellow" footerPrice="$260" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Staller Center" tileId={27} colorGroup="yellow" footerPrice="$260" player_pos={player_pos} player_color={player_color}/>
                        <UtilityTile propertyName="Softheon Bikes" tileId={28} footerPrice="$150" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Wang Center" tileId={29} colorGroup="yellow" footerPrice="$280" player_pos={player_pos} player_color={player_color}/>
                    </div>
                    <div className="space corner go-to-jail">
                        <GoToJailTile propertyName="Go to Jail" tileId={30} player_pos={player_pos} player_color={player_color}/>
                    </div>
                    <div className="row vertical-row right-row">
                        <HouseTile propertyName="Island Federal Arena" tileId={31} colorGroup="green" footerPrice="$300" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Rec Center" tileId={32} colorGroup="green" footerPrice="$300" player_pos={player_pos} player_color={player_color}/>
                        <ChanceTile propertyName="Community Chest" tileId={33} player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="LaValle Stadium" tileId={34} colorGroup="green" footerPrice="$320" player_pos={player_pos} player_color={player_color}/>
                        <DiningTile propertyName="Jasmine" tileId={35} footerPrice="$200" />
                        <ChanceTile propertyName="Chance" tileId={36} player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Chavez Hall" tileId={37} colorGroup="dark-blue" footerPrice="$350" player_pos={player_pos} player_color={player_color}/>
                        <TaxTile propertyName="Tuition Fee" tileId={38} footerPrice="$100" player_pos={player_pos} player_color={player_color}/>
                        <HouseTile propertyName="Tubman Hall" tileId={39} colorGroup="dark-blue" footerPrice="$400" player_pos={player_pos} player_color={player_color}/>


                    </div>
                </div>
            </div>
        );
    }
}

export default GameBoard;