import React, { Component, PropTypes } from 'react';

export default function PasswordTitle({headline, credential}){
        return(
            <div>
                <p className="lead">{headline}</p>
                <small>{(credential) ? credential : null} </small>
            </div>
        )
}
