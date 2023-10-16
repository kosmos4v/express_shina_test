import classnames from "classnames";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TCategory } from "../../../models/categories";

import './CategoryList.scss';
import { useCallback } from "react";

type TCategoryListProps = {
    className?: string,
    data: TCategory[],
}

const findCategoryBySlug = (data: TCategory[], slug: string): TCategory | undefined => {
    for (let category of data) {
        if (category.slug === slug) {
            return category;
        }
        if (category.children) {
            const found = findCategoryBySlug(category.children, slug);
            if (found) return found;
        } 
    }   
};

export const CategoryList: React.FC<TCategoryListProps> = ({ className, data }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const category = slug
        ? findCategoryBySlug(data, slug)
        : { name: 'Главная', children: data, index: false};
    const handleClickBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);
    return (
        <div className={classnames('categories', className)}>
            <Helmet>
                <meta name="robots" content={category?.index ? 'index' : 'noindex'} />
                <meta name="description" content={category?.name} />
                <title>{category?.name}</title>
            </Helmet>
            <h1>{category?.name}</h1>
            <ul>
                {
                    slug && <button
                        onClick={handleClickBack}
                        className="categories__button-back"
                    >
                        Назад
                    </button>
                }
                {
                    category?.children?.concat()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((child) => (
                            <li key={child.id}>
                                <Link
                                    to={`/${child.slug}`}
                                    className="categories__link"
                                >
                                        {child.name}
                                </Link>
                            </li>
                        ))
                }
            </ul>
        </div>
    )
};