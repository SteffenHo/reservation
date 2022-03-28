import React, { useState } from 'react';
import { DataInput } from './Data';
import { ReservationSelector } from './ReservationSelector';

/* In diesem Component sind alle anderen Components (Außer App). Sie ist statefull. */
export class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            dateFrom: 0, 
            dateTo: 0,
            selectedPc: '1',
            values: {
                name: '',
                dateFrom: '',
                dateTo: ''
            },
            reservations: {
                1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
                7: {}, 8: {}, 9: {}, 10: {}, 11: {}, 12: {}
            }
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmitDataInput = this.onSubmitDataInput.bind(this);
        this.onChangePc = this.onChangePc.bind(this);
        this.newReservation = this.newReservation.bind(this);
        this.cancleReservation = this.cancleReservation.bind(this);
        this.newReservationRoomView = this.newReservationRoomView.bind(this);
    }
    
    /* Diese Methode setzt denn in stat angegebenen state auf den in value angegebenen Wert. */
    onChange(stat, value) {
        console.log("call MainContent onChange", "stat:", stat, "value:", value);
        let newValue = JSON.parse(JSON.stringify(this.state.values));
        newValue[stat] = value;
        this.setState({
            values: newValue
        });
        console.log("State:", this.state);
    }

    /* Diese Methode setzt bei drücken des Ok-Knopfes die Werte name, dateFrom und dateTo im state zu dem Werten wie
    sie im values-state gespeichert sind. */
    onSubmitDataInput() {
        console.log("call MainContent onSubmitDataInput");
        this.setState(state => ({
            name: state.values.name,
            dateFrom: new Date(state.values.dateFrom).getTime(),
            dateTo: new Date(state.values.dateTo).getTime()
        }))
        console.log("State:", this.state);
    }

    /* Diese Methode ändert den Ausgewählten PC sie wird sowohl beim änderen der Auswahl im select-Element als auch
    beim drücken eines Auswählen Knopfes aufgerufen. */
    onChangePc(event) {
        console.log("call MainContent onChangePc", "event.target.value:", event.target.value);
        this.setState({
            selectedPc: event.target.value
        });
        console.log("State:", this.state);
    }

    /* Diese Methode reserviert einen Arbeitsplatz für eine Person beim drücken des Knopfes reservieren. */
    newReservation() {
        console.log("call MainContent newReservation")
        let dateFrom = Math.floor(this.state.dateFrom / 86400000);
        let dateTo = Math.floor(this.state.dateTo / 86400000);
        let reservations = JSON.parse(JSON.stringify(this.state.reservations));
        for (let i = dateFrom; i <= dateTo; i++) {
            let day = i * 86400000;
            reservations[parseInt(this.state.selectedPc)][day] = this.state.name;
        }

        this.setState({
            reservations: reservations
        })
    }

    newReservationRoomView(day, pc) {
        console.log("call MainContent newReservationRoomView");
        let reservations = JSON.parse(JSON.stringify(this.state.reservations));
        reservations[pc][day] = this.state.name;

        this.setState({
            reservations: reservations
        })
    }

    /* Diese Methode storniert einen Arbeitsplatz beim drücken des Knopfes Stornieren. */
    cancleReservation() {
        console.log("call MainContent cancleReservation");
        let dateFrom = Math.floor(this.state.dateFrom / 86400000);
        let dateTo = Math.floor(this.state.dateTo / 86400000);
        let reservations = JSON.parse(JSON.stringify(this.state.reservations));
        for (let i = dateFrom; i <= dateTo; i++) {
            let day = i * 86400000;
            delete reservations[parseInt(this.state.selectedPc)][day];
        }

        this.setState({
            reservations: reservations
        });
    }

    render() {
        return (
            <div>
                <DataInput 
                    name={this.state.name}
                    onChange={this.onChange}
                    onSubmit={this.onSubmitDataInput}
                    dateFromValue={this.state.values.dateFrom}
                />
                <ReservationSelector
                    name={this.state.name}
                    dateFrom={this.state.dateFrom}
                    dateTo={this.state.dateTo}
                    onChangePc={this.onChangePc}
                    selectedPc={this.state.selectedPc}
                    new={this.newReservation}
                    cancle={this.cancleReservation}
                    reservations={this.state.reservations}
                    newReservationRoomView={this.newReservationRoomView}
                />               
            </div>
        )
    }
}

/*
Aufbau von states:
name: der Name des Benutzers
dateFrom: das Anfangsdatum
dateTo: das Enddatum
selectedPc: der ausgewählte Arbeitsplatz
values: ein Objekt für die nochnicht bestätigten Angaben zu name, dateFrom und dateTo
reservations: eine Objekt welches für jeden Arbeitsplatz ein Objekt mit einzelen Tagen enthält,
    die Werte in diesem Objekt sind ist der Name des jenigen der den Arbeitsplatz reserviert hat,
    wenn keine Reservierung vorliegt ist der Tag nicht vorhanden
*/