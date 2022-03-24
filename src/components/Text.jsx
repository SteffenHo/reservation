import React, { useState } from 'react';

/* Diese Component enthält einen Begrüßungstext. */
export const WelcomeText = (props) => {
    return (
        <div>
            <h1>Platzreservierung</h1>
            <p>
                <strong>Hallo {props.name}</strong> hier kannst du dir einen Arbeitsplatz im Büro reservieren oder 
                stornieren.
            </p>
        </div>
    );
}