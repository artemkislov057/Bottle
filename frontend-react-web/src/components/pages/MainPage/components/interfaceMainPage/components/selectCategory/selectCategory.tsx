import React, { useState } from 'react';
import './selectCategory.css';
import { CategoryList } from './categoryListContainer';

export const SelectCategory:React.FC = React.memo(() => {
    const [currentCategory, setCurtrentCategory] = useState('Все категории');
    const [categoryList, setCategoryList] = useState({list: <></>, isOpen: false});

    function onClickCategoryContainer() {
        if(categoryList.isOpen) {
            setCategoryList({list: <></>, isOpen: false})
        } else {
            setCategoryList({list: <CategoryList />, isOpen: true})
        }        
    }

    return <div className='select-category-container'>
        <div className='select-category-checked-area' onClick={() => onClickCategoryContainer()}>
            <div className='select-category-checked-category-name'>{currentCategory}</div>
            <div className='select-category-checked-category-button'></div>
        </div>
        {categoryList.list}
    </div>
})