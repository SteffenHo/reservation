import React, { useState } from 'react';
import { WelcomeText } from './Text';
import { DataInputForm } from './DataForm';

/* In diesen Component sind der Begrüßungstext und das obere Form enthalten */
export class DataInput extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return this.props != nextProps;
    }

    render() {
        return (
            <div>
                <WelcomeText name={this.props.name == "" ? "E-Com IT" : this.props.name}/>
                <DataInputForm 
                    name={this.props.name} 
                    onChange={this.props.onChange} 
                    onSubmit={this.props.onSubmit}
                    dateFromValue={this.props.dateFromValue}
                />
            </div>
        );  
    }
}