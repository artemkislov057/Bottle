import React from "react";
import { CategoryListItem } from "./categoryListItem";

import hangIcon from './categoryHangIcon.svg';
import commercIcon from './categoryCommercIcon.svg';
import sportIcon from './categorySportIcon.svg';
import otherIcon from './categoryOtherIcon.svg';
import acquaintanceIcon from './categoryAcquaintanceIcon.svg';


export const CategoryList:React.FC = React.memo(() => {
    return <div className="select-category-list-container">
        <CategoryListItem titleName="Продажи" urlImage={commercIcon} />
        <CategoryListItem titleName="Тусовки" urlImage={hangIcon} />
        <CategoryListItem titleName="Знакомства" urlImage={acquaintanceIcon} />
        <CategoryListItem titleName="Спорт" urlImage={sportIcon} />
        <CategoryListItem titleName="Прочее" urlImage={otherIcon} />
    </div>
})