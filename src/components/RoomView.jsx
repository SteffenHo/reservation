import React from "react";
import { Row, Col } from "react-bootstrap";
import { WorkingPlaceRow } from "./WorkingPlaceRow";
import './RoomView.css';

/* Dieses Objekt dient der zuordnung der Zustände des Arbeiplatzes zu den CSS-Styles und Texten. */
const pcStates = {
    free: {
        className: "free",
        text: "Verfügbar"
    },
    partiallyFree: {
        className: "partially-free",
        text: "Teilweise verfügbar"
    },
    reserverd: {
        className: "reservert",
        text: "Reserviert"
    },
    youReservert: {
        className: "you-reservert",
        text: "Von dir reserviert"
    },
    chooseDate: {
        className: "choose-date",
        text: "Bitte Datum auswählen"
    },
    youReservertOther: {
        className: "you-reservert-other",
        text: "Anderer Platz reserviert"
    }
}

/* Diese Component dient der Erstellunf einer Übersichtsgrafik. */
export class RoomView extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    render() {
        let usedState = this.props.pcStates;
        return (
            <div className="room">
                <Col><div className="window"/></Col>
                <Col>
                    <Row>
                        <WorkingPlaceRow
                            leftNumber={1} leftState={pcStates[usedState[1]]}
                            midNumber={2} midState={pcStates[usedState[2]]}
                            rightNumber={3} rightState={pcStates[usedState[3]]}
                            onChangePc={this.props.onChangePc}
                        />
                    </Row>
                    <Row>
                        <WorkingPlaceRow
                            leftNumber={4} leftState={pcStates[usedState[4]]}
                            midNumber={5} midState={pcStates[usedState[5]]}
                            rightNumber={6} rightState={pcStates[usedState[6]]}
                            onChangePc={this.props.onChangePc}
                        />
                    </Row>
                    <div className="big-way"/> {/* This is is to create a empty space between the second and thired row. */}
                    <Row>
                        <WorkingPlaceRow
                            leftNumber={7} leftState={pcStates[usedState[7]]}
                            midNumber={8} midState={pcStates[usedState[8]]}
                            rightNumber={9} rightState={pcStates[usedState[9]]}
                            onChangePc={this.props.onChangePc}
                        />
                    </Row>
                    <Row>
                        <WorkingPlaceRow
                            leftNumber={10} leftState={pcStates[usedState[10]]}
                            midNumber={11} midState={pcStates[usedState[11]]}
                            rightNumber={12} rightState={pcStates[usedState[12]]}
                            onChangePc={this.props.onChangePc}
                        />
                    </Row>
                </Col>
            </div>
        )
    }
}