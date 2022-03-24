import React from "react";
import { RoomView } from "./RoomView";
import { ReservationInput } from "./ReservationInput";
import { UserReservations } from "./UserReservations";

/* Diese Component enthält die Übersichtsgrafik und die Auswahlelement unten, sie dient zur Verwaltung dieser. */
export class ReservationSelector extends React.Component {
    constructor(props) {
        super(props)
        this.hasAlreadyMakeAReservation = this.hasAlreadyMakeAReservation.bind(this);
        this.nonFreePcs = this.nonFreePcs.bind(this);
        this.getAllPcStates = this.getAllPcStates.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    /* Diese Methode überprüft ob der Benutzter schon eine Reservierung gemacht hat. */
    hasAlreadyMakeAReservation() {
        console.log("call ReservationSelector hasAlreadyMakeAReservation");
        let reservations = this.props.reservations;
        let dateFrom = Math.floor(this.props.dateFrom / 86400000);
        let dateTo = Math.floor(this.props.dateTo / 86400000);
        let result = {
            maked: false,
            pc: 0
        }
        for (let i = 1; i <= 12; i++) {
            let finished = false;
            let pc = reservations[i];
            for (let j = dateFrom; j <= dateTo; j++) {
                let day = j * 86400000;
                console.log("day in pc:", day in pc);
                if (day in pc && pc[day] == this.props.name) {
                    result.maked = true;
                    result.pc = i;
                    finished = true;
                    break;
                }
            }
            if (finished) {
                break;
            }
        }
        console.log("result:", result);
        return result;
    }

    /* Diese Methode schaut ob ein PC schon besetzt ist. */
    nonFreePcs() {
        console.log("call ReservationSelector nonFreePcs");
        let result = {};
        let dateFrom = Math.floor(this.props.dateFrom / 86400000);
        let dateTo = Math.floor(this.props.dateTo / 86400000);
        let reservations = this.props.reservations;
        for (let i = 1; i <= 12; i++) {
            let pc = reservations[i];
            let state = this.props.dateFrom in pc ? "reserverd" : "free";
            for (let j = dateFrom + 1; j <= dateTo; j++) {
                let day = j * 86400000;
                if ((day in pc && state != "reserverd") || (!(day in pc) && state == "reserverd")) {
                    state = "partiallyFree";
                }
            }
            result[i] = state;
        }
        return result;
    }

    /* Diese Methode überprüft den Status der Arbeitsplätze unter berücksichtigung der vorherigen Methoden. */
    getAllPcStates() {
        console.log("call ReservationSelector getAllPcStates");
        console.log("dateFrom in getAllPcStates:", this.props.dateFrom)
        let dateInValied = this.props.dateFrom == 0;
        let hasReservation = this.hasAlreadyMakeAReservation();
        let nonFree = this.nonFreePcs();
        let pcs = {};
        for (let i = 1; i <= 12; i++) {
            let state = dateInValied
                        ? "chooseDate"
                        : hasReservation.maked
                          ? hasReservation.pc == i ? "youReservert" : "youReservertOther"
                          : nonFree[i];
            pcs[i] = state;
        }
        return pcs;
    }

    render() {
        let allPcStates = this.getAllPcStates();
        return (
            <div>
                <RoomView 
                    pcStates={allPcStates}
                    onChangePc={this.props.onChangePc}
                />
                <UserReservations
                    reservations={this.props.reservations}
                    name={this.props.name}
                />
                <ReservationInput 
                    onChangePc={this.props.onChangePc}
                    selectedPcState={allPcStates[this.props.selectedPc]}
                    value={this.props.selectedPc}
                    new={this.props.new}
                    cancle={this.props.cancle}
                />
            </div>
        )
    }
}