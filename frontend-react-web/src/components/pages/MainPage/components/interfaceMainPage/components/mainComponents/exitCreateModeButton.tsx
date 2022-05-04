import React from "react";

type TProps = {
    onClick: Function,
    setSelf: React.Dispatch<React.SetStateAction<JSX.Element>>
}

export const ExitCreateButton:React.FC<TProps> = React.memo((props) => {
    function onClickExitCreate() {
        props.setSelf(<></>);
        props.onClick();
    }

    return <button className="exit-create-bottle-button-mainPage" onClick={() => onClickExitCreate()}></button>
})