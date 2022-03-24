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
    sie im values-state gespeichert sind. Zudem wandelt sie die Daten in Tage seit dem 01.01.1970 um.*/
    onSubmitDataInput() {
        console.log("call MainContent onSubmitDataInput");
        this.setState(state => ({
            name: state.values.name,
            dateFrom: Math.floor(new Date(state.values.dateFrom).getTime() / 86400000),
            dateTo: Math.floor(new Date(state.values.dateTo).getTime() / 86400000)
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
        let reservations = JSON.parse(JSON.stringify(this.state.reservations));
        for (let i = this.state.dateFrom; i <= this.state.dateTo; i++) {
            reservations[parseInt(this.state.selectedPc)][i] = this.state.name;
        }

        this.setState({
            reservations: reservations
        })
    }

    /* Diese Methode storniert einen Arbeitsplatz beim drücken des Knopfes Stornieren. */
    cancleReservation(name, dateFrom) {
        console.log("call MainContent cancleReservation");
        let reservations = JSON.parse(JSON.stringify(this.state.reservations));
        for (let i = this.state.dateFrom; i <= this.state.dateTo; i++) {
            delete reservations[parseInt(this.state.selectedPc)][i];
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
                />               
            </div>
        )
    }
}

/*
Aufbau von states:
name: der Name des Benutzers
dateFrom: das Anfangsdatum des ausgewählten Zeitraumes in Tagen seit 01.01.1970
dateTo: das Enddatum des ausgewöhlten Zeitraumes in Tagen seit 01.01.1970
selectedPc: der ausgewählte Arbeitsplatz
values: ein Objekt für die nochnicht bestätigten Angaben zu name, dateFrom und dateTo; dateFrom und -To als string
reservations: eine Objekt welches für jeden Arbeitsplatz ein Objekt mit einzelen Tagen enthält,
    die werte in diesem Objekt sind ist der Name des jenigen der den Arbeitsplatz reserviert hat,
    wenn keine Reservierung vorliegt ist der Tag nicht vorhanden
*/