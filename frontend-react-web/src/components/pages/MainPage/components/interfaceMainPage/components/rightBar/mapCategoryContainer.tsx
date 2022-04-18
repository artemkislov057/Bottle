import React from "react";
import { SelectCategory } from "../selectCategory/selectCategory";

export const CategoryContainer:React.FC = React.memo(() => {
    return <div className="right-bar-map-category-container">
        <label className="right-bar-map-category-title" htmlFor="map-category-select">Категория</label>
        <div className="right-bar-map-category-custom-select">
            <SelectCategory />
        </div>
        {/* <select className="right-bar-map-category-select" id="map-category-select" required>
            <option></option>
            <option>Тусовки</option>
            <option>Продажи</option>
            <option>Спорт</option>
        </select> */}
    </div>
})