import React from "react";

type TProps = {
    type: string,
    labelName: string,
    value: string,
    onChange: Function
}

export const InputLableContainerProfileBar:React.FC<TProps> = React.memo((props) => {
    return <div className="user-info-container-label-input">
        <label 
            className="user-info-container-label" 
            htmlFor={`user-info-container-inp-${props.labelName}`}>
                {props.labelName}
        </label>
        <input 
            type={props.type}
            className={`user-info-container-input ${props.labelName}`}
            id={`user-info-container-inp-${props.labelName}`}
            value={props.value}
            onChange={(e) => props.onChange(e)} />
    </div>
})