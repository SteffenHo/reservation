import React from "react";
import { RoomView } from "./RoomView";
import { ReservationInput } from "./ReservationInput";

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
        let result = {
            maked: false,
            pc: 0
        }
        for (let i = 1; i <= 12; i++) {
            let finished = false;
            let pc = reservations[i];
            for (let j = this.props.dateFrom; j <= this.props.dateTo; j++) {
                console.log("j in pc:", j in pc);
                if (j in pc && pc[j] == this.props.name) {
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
        let dateFrom = this.props.dateFrom;
        let dateTo = this.props.dateTo;
        let reservations = this.props.reservations;
        for (let i = 1; i <= 12; i++) {
            let pc = reservations[i];
            let state = dateFrom in pc ? "reserverd" : "free";
            for (let j = dateFrom + 1; j <= dateTo; j++) {
                if ((j in pc && state != "reserverd") || (!(j in pc) && state == "reserverd")) {
                    state = "partiallyFree";
                }
            }
            /*
            for (let j = this.props.dateFrom; j <= this.props.dateTo; j++) {
                if (j in reservations[i]) {
                    state = "reserverd";
                } else if (state == "reserverd") {
                    state = "partiallyFree";
                    break;
                }
            }
            */
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