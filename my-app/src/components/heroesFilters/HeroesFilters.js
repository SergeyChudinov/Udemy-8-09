import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { heroesFilter } from '../../actions';
import {useHttp} from '../../hooks/http.hook'
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [elements, setElements] = useState([]);

    useEffect(() => {

        request("http://localhost:3001/filters")
            .then(data => setElements(data))
            .catch(err => console.log(err))
        // eslint-disable-next-line
    }, []);
    const onFilterSelect = (element) => {
        dispatch(heroesFilter(element));
    }

    const filter = elements.map(({id, element, className, description}) => {
        const active = filters === element;
        const clazz = active ? "active" : "";
        return (
            <button onClick={() => onFilterSelect(element)}
                key={id} value={element} 
                className={`${className} ${clazz}`}>
                    {description}
            </button>
        )
    })
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filter}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;