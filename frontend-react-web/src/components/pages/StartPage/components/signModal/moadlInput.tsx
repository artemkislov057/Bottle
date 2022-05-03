import React, { useEffect, useState } from "react";

type TProps = {
    labelName: string,
    id: string,
    type?: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const ModalInput:React.FC<TProps> = React.memo((props) => {
    return <div className="sign-modal-body-info-input-container">
        <label htmlFor={`body-info-input-input-${props.id}`} className="sign-modal-body-info-input-label">{props.labelName}</label>
        <input 
            type={props.type || 'email'} 
            id={`body-info-input-input-${props.id}`} 
            className="sign-modal-body-info-input-input" 
            value={props.value}
            onChange={e => props.setValue(e.target.value)}
            required 
            minLength={props.type === 'password'? 6 : null}
            
            >
            </input>
    </div>
})