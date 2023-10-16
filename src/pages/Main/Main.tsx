import { useEffect } from 'react';
import classnames from 'classnames';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import CategoryList from '../../components/Category/CategoryList';
import { fetchCategories } from '../../redux/reducers/CategoriesSlice';

import './Main.scss';

type TMainProps = {
    className?: string,
}

export const Main: React.FC<TMainProps> = ({ className })=> {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    const {
        categories,
        isCategoriesLoading,
        categoriesError
    } = useAppSelector((state) => state.CategoriesReducer);

    return (
        <div className={classnames('container', className)}>
            {isCategoriesLoading && 'Идет загрузка!!!'}
            {categoriesError}
            {
                !isCategoriesLoading
                && !categoriesError
                && <CategoryList data={categories}/>
            }
        </div>
    )
};