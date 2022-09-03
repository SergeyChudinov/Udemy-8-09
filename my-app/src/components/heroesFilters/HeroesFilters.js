import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { fetchFilters, activeFilterChanged } from '../../actions';
import {useHttp} from '../../hooks/http.hook'
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <div>Загрузка...</div>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const elements = filters.map(({id, name, className, label}) => {
        // const active = filters === element;
        // const clazz = active ? "active" : "";
        const btnClass = classNames('btn', className, {
            'active': name === activeFilter
        });
        return (
            <button onClick={() => dispatch(activeFilterChanged(name))}
                key={id} value={name} 
                className={btnClass}>  
                    {label}
            </button>
        )       
    })
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;