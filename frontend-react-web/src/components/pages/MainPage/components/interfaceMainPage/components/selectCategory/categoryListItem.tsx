import React from "react";

type TProps = {
    urlImage: string,
    titleName: string,
    category: string,
    changeCategory: Function

}

export const CategoryListItem:React.FC<TProps> = React.memo((props) => {
    return <div className="select-category-list-item" onClick={() => props.changeCategory(props.category)}>
        <img className="select-category-list-item-icon" src={props.urlImage} alt={`icon ${props.titleName}`}/>
        <div className="select-category-list-item-name">{props.titleName}</div>
    </div>
})