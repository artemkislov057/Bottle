import React from "react";

export const SearchFieldChat:React.FC = React.memo(() => {
    return <div className="chat-page-left-header-search-container">
        <form id="left-header-search-form" className="left-header-search-form" onSubmit={(e) => {e.preventDefault(); console.log(10)}}>
            <input className="left-header-search-input" type={"search"}/>
        </form>                    
        <button className="left-header-search-button" type="submit" form="left-header-search-form"></button>
    </div>
})