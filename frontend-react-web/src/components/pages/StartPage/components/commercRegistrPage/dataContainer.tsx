import React from "react";

type TProps = {
    headerName: string,
    fieldsNames: Array<{field: string, title: string, type?: string, value?: string, accessChange?: boolean}>
    updateData: Function,    
}

export const DataContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="commerc-registration-data-container">
        {
            props.headerName ?
                <div className="commerc-registration-data-container-header">
                    {props.headerName}
                </div>
                : null
        }        
        <div className="commerc-registration-data-container-data-fields">
            {props.fieldsNames.map(data => {
                return <div key={data.field} className="commerc-registration-data-container-input-field">
                    <label 
                        className="commerc-registration-data-container-input-field-label" 
                        htmlFor={`commerc-registration-data-container-input-field-input ${data.field}`}>
                            {data.title}
                    </label>
                    <input 
                        className={`commerc-registration-data-container-input-field-input ${data.field}`}
                        id={`commerc-registration-data-container-input-field-input ${data.field}`}
                        onChange={e => props.updateData(data.field, e.target.value)}
                        required
                        type={data.type ? data.type : 'text'}
                        readOnly={data.accessChange ? true : false}
                        // value={data.value ? data.value : ''}
                        defaultValue={data.value ? data.value : ''}
                    >
                    </input>
                </div>                
            })}
        </div>
    </div>
})