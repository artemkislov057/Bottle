import React from "react";
import { SelectCategory } from "../selectCategory/selectCategory";

type TProps = {
    currentCategory: string,
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

export const Select:React.FC<TProps> = React.memo((props) => {
    return <div className="select-category-mainPage-input">
        <SelectCategory currentCategory={props.currentCategory} setCategory={props.setCategory}/>
    </div>
})