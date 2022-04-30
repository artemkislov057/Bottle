import React, { useEffect, useState } from "react";

type TProps = {
    labelName: string,
    id: number
}

export const ModalInput:React.FC<TProps> = React.memo((props) => {
    return <div className="sign-modal-body-info-input-container">
        <label htmlFor={`body-info-input-input-${props.id}`} className="sign-modal-body-info-input-label">{props.labelName}</label>
        <input type={'text'} id={`body-info-input-input-${props.id}`} className="sign-modal-body-info-input-input"></input>
    </div>
})