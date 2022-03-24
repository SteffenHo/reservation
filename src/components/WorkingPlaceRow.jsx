import React from "react";
import { CardGroup } from "react-bootstrap";
import { WorkingPlace } from "./WorkingPlace";

export const WorkingPlaceRow = (props) => {
    return (
        <CardGroup>
            <WorkingPlace pcNumber={props.leftNumber} pcState={props.leftState} onChangePc={props.onChangePc}/>
            <WorkingPlace pcNumber={props.midNumber} pcState={props.midState} onChangePc={props.onChangePc}/>
            <WorkingPlace pcNumber={props.rightNumber} pcState={props.rightState} onChangePc={props.onChangePc}/>
        </CardGroup>
    )
}