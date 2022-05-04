import React from "react";

type TProps = {
    onClick: Function
}

export const CreateButton:React.FC<TProps> = React.memo((props) => {
    return <button className="create-bottle-button-mainPage" onClick={() => props.onClick()}>+</button>
})