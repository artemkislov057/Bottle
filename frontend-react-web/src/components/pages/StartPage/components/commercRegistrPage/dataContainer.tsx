import React from "react";

type TProps = {
    headerName: string,
    fieldsNames: Array<string>
}

export const DataContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="commerc-registration-data-container">
        <div className="commerc-registration-data-container-header">
            {props.headerName}
        </div>
        <div className="commerc-registration-data-container-data-fields">
            {props.fieldsNames.map(name => {
                return <div key={name} className="commerc-registration-data-container-input-field">
                    <label className="commerc-registration-data-container-input-field-label" htmlFor={`commerc-registration-data-container-input-field-input ${name}`}>{name}</label>
                    <input 
                        className={`commerc-registration-data-container-input-field-input ${name}`}
                        id={`commerc-registration-data-container-input-field-input ${name}`}
                        required
                    >
                    </input>
                </div>                
            })}
        </div>
    </div>
})