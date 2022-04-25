import React, { useEffect, useState } from 'react';
import './selectCategory.css';
import { CategoryList } from './categoryListContainer';

type TProps = {
    setCategory?: React.Dispatch<React.SetStateAction<string>>,
    currentCategory?: string
}

export const SelectCategory:React.FC<TProps> = React.memo((props) => {
    const [currentCategory, setCurtrentCategory] = useState('Все категории');
    const [categoryList, setCategoryList] = useState({list: <></>, isOpen: false});

    useEffect(() => {
        if(props?.currentCategory) {
            setCurtrentCategory(props.currentCategory);
        }
    }, [props.currentCategory])

    function onClickCategoryContainer() {
        if(categoryList.isOpen) {
            setCategoryList({list: <></>, isOpen: false});
        } else {
            setCategoryList({list: <CategoryList changeCategory={changeCurrentCategory}/>, isOpen: true});
        }        
    }

    function changeCurrentCategory(current: string) {
        setCurtrentCategory(current);
        if(props.setCategory)//временно
            props.setCategory(current);
        setCategoryList({list: <></>, isOpen: false});
    }

    return <div className='select-category-container'>
        <div className='select-category-checked-area' onClick={() => onClickCategoryContainer()}>
            <div className='select-category-checked-category-name'>{currentCategory}</div>
            <div className='select-category-checked-category-button'></div>
        </div>
        {categoryList.list}
    </div>
})