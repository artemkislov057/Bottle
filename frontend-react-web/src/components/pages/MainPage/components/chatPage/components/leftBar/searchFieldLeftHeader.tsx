import React from "react";

type TProps = {    
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

export const SearchFieldChat:React.FC<TProps> = React.memo((props) => {
    function onChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
        props.setSearchValue(e.target.value);
    }


    return <div className="chat-page-left-header-search-container">
        <form id="left-header-search-form" className="left-header-search-form" onSubmit={(e) => {e.preventDefault(); console.log(10)}}>
            <input className="left-header-search-input" type="search" value={props.searchValue} onChange={e => onChangeSearchValue(e)}/>
        </form>                    
        <button className="left-header-search-button" type="submit" form="left-header-search-form"></button>
    </div>
})