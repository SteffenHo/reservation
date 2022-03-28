import React from "react";

export class UserReservations extends React.Component {
    constructor(props) {
        super(props);
        this.proviedUserRerservations = this.proviedUserRerservations.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    proviedUserRerservations() {
        let result = {
            visible: false,
            reservations: []
        }
        let reservations = this.props.reservations;
        for (let i = 1; i <= 12; i++) {
            let pc = reservations[i];
            for (const day in pc) {
                if (pc[day] == this.props.name) {
                    result.visible = true;
                    let date = new Date(parseInt(day)).toISOString().split("T")[0].split("-");
                    let dayMonthYear = date[2] + "." + date[1] + "." + date[0];
                    result.reservations.push("am " + dayMonthYear + " Arbeitsplatz " + i);
                }
            }
        }
        return result;
    }

    render() {
        let reservations = this.proviedUserRerservations();
        return (
            <div>
                {reservations.visible && 
                <p>
                    Du hast bereits folgende Arbeitsplätze reserviert: {
                        reservations.reservations.join(", ")
                    }
                </p>}
            </div>
        );
    }
}