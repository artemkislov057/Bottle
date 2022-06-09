import React from "react";

type TProps = {
    titleName: string
    onLoadDocument: Function,
    visualDocument: JSX.Element
}

export const DocumentContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="commerc-registration-data-side-document-container">
        <label className="commerc-registration-data-side-document-container-label">
            {props.titleName}
        </label>
        <div className="commerc-registration-data-side-document-container-input-field">
            <label className="commerc-registration-data-side-document-container-help-label"
                htmlFor={`document-container-input ${props.titleName}`}            
            >
            </label>
            <input 
                type={'file'} 
                className={`commerc-registration-data-side-document-container-input`}
                id={`document-container-input ${props.titleName}`}
                onChange={e => props.onLoadDocument(e)}
                required
            >
            </input>
            {props.visualDocument}
        </div>
    </div>
})