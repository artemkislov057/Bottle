import React from "react";
import { HelpSearchContainer } from "../helpSearchContainer/helpSearchContainer";

type TProps = {
    onClick: Function,
    withOtherButton: boolean
}

export const Toolbar:React.FC<TProps> = React.memo((props) => {
    return <div className="interfaceButton-search-field-with-otherButton">        
        {
            props.withOtherButton 
            ? <button className="open-other-container-button" onClick={() => props.onClick()}></button>
            : null
        }
        <HelpSearchContainer />
    <button type="submit" form="interfaceButton-search-container-form" className="search-address-container-button"></button>
</div>  
})