import React, { useEffect, useState } from 'react';
import './selectCategory.css';
import { CategoryList } from './categoryListContainer';
import { CSSTransition } from 'react-transition-group';

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
            // setCategoryList({list: <></>, isOpen: false});
            setCategoryList({list: categoryList.list, isOpen: false});
        } else {
            setCategoryList({list: <CategoryList changeCategory={changeCurrentCategory}/>, isOpen: true});
        }        
    }

    function onBlurCategoryContainer() {
        // setCategoryList({list: <></>, isOpen: false});
        setCategoryList({list: categoryList.list, isOpen: false});
    }

    function changeCurrentCategory(current: string) {
        setCurtrentCategory(current);
        if(props.setCategory)//временно
            props.setCategory(current);
        setCategoryList({list: <></>, isOpen: false});
    }

    return <div className='select-category-container' tabIndex={0} onBlur={onBlurCategoryContainer}>
        <div className='select-category-checked-area' onClick={() => onClickCategoryContainer()} >
            <div className='select-category-checked-category-name'>{currentCategory}</div>
            <div className='select-category-checked-category-button'></div>
        </div>
        <CSSTransition
            in={categoryList.isOpen}
            timeout={300}
            classNames='show-category-list'
            unmountOnExit
        >
            {categoryList.list}
        </CSSTransition>        
    </div>
})