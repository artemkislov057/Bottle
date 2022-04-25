import React from "react";
import { SelectCategory } from "../selectCategory/selectCategory";

type TProps = {
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    currentCategory?: string
}

export const CategoryContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-category-container">
        <label className="right-bar-map-category-title" htmlFor="map-category-select">Категория</label>
        <div className="right-bar-map-category-custom-select">
            <SelectCategory setCategory={props.setCategory} currentCategory={props.currentCategory}/>
        </div>
        {/* <select className="right-bar-map-category-select" id="map-category-select" required>
            <option></option>
            <option>Тусовки</option>
            <option>Продажи</option>
            <option>Спорт</option>
        </select> */}
    </div>
})