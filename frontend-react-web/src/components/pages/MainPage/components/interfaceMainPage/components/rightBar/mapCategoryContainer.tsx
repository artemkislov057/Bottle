import React from "react";

export const CategoryContainer:React.FC = React.memo(() => {
    return <div className="right-bar-map-category-container">
        <label className="right-bar-map-category-title" htmlFor="map-category-select">Категория</label>
        <select className="right-bar-map-category-select" id="map-category-select">
            <option></option>
            <option>Тусовки</option>
            <option>Продажи</option>
            <option>Спорт</option>
        </select>
    </div>
})