import React from "react";
import { CategoryListItem } from "./categoryListItem";

import hangIcon from './categoryHangIcon.svg';
import commercIcon from './categoryCommercIcon.svg';
import sportIcon from './categorySportIcon.svg';
import otherIcon from './categoryOtherIcon.svg';
import acquaintanceIcon from './categoryAcquaintanceIcon.svg';

type TProps = {
    changeCategory: Function
}

export const CategoryList:React.FC<TProps> = React.memo((props) => {
    return <div className="select-category-list-container">
        <CategoryListItem titleName="Продажи" urlImage={commercIcon} category="Продажи" changeCategory={props.changeCategory} />
        <CategoryListItem titleName="Тусовки" urlImage={hangIcon} category="Тусовки" changeCategory={props.changeCategory} />
        <CategoryListItem titleName="Знакомства" urlImage={acquaintanceIcon} category="Знакомства" changeCategory={props.changeCategory} />
        <CategoryListItem titleName="Спорт" urlImage={sportIcon} category="Спорт" changeCategory={props.changeCategory} />
        <CategoryListItem titleName="Прочее" urlImage={otherIcon} category="Прочее" changeCategory={props.changeCategory} />
    </div>
})