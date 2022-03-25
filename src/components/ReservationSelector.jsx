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
        this.getReservations = this.getReservations.bind(this);
        this.getNamesOfReservations = this.getNamesOfReservations.bind(this);
        this.getDaysOfReservation = this.getDaysOfReservation.bind(this);
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

    getNamesOfReservations(pc) {
        console.log("call ReservationSelector getNameOfReservations");
        let result = [];
        let reservations = this.props.reservations[pc];
        for (const day in reservations) {
            if (this.props.dateFrom <= day && day <= this.props.dateTo) {
                result.push(reservations[day]);
            }
        }
        return result;
    }

    getDaysOfReservation(pc) {
        console.log("call ReservationSelector getDaysOfReservations");
        let result = [];
        let part2 = [];
        let reservations = this.props.reservations[pc];
        let dayFrom = Math.floor(this.props.dateFrom / 86400000);
        let dayTo = Math.floor(this.props.dateTo / 86400000);
        for (let i = dayFrom; i <= dayTo; i++) {
            let day = i * 86400000;
            if (day in reservations) {
                let date = new Date(parseInt(day)).toISOString().split("T")[0].split("-");
                let dayMonthYear = date[2] + "." + date[1] + "." + date[0];
                result.push(dayMonthYear);
                part2.push(day);
            }
        }
        return {
            dates: result,
            timestamps: part2
        }
    }

    getReservations(states) {
        console.log("call ReservationSelector getReservations");
        let result = {}
        let pcs = states;
        for (let i = 1; i <= 12; i++) {
            result[i] = {}
            if (pcs[i] == "reserverd") {
                result[i].names = "Reserviert von: " + this.getNamesOfReservations(i).join(", ");
            } else if (pcs[i] == "partiallyFree") {
                let days = this.getDaysOfReservation(i);
                result[i].dates = "Reserviert am: " + days.dates.join(", ")
                result[i].timestamps = days.timestamps;
            }
        }
        return result;
    }

    render() {
        let allPcStates = this.getAllPcStates();
        let filterdReservations = this.getReservations(allPcStates);
        return (
            <div>
                <RoomView 
                    pcStates={allPcStates}
                    onChangePc={this.props.onChangePc}
                    filterdReservations={filterdReservations}
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