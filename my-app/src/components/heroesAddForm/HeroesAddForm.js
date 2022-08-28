import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import {useHttp} from '../../hooks/http.hook'

import { heroesFetchingError, heroesAdd } from '../../actions';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [nameHero, setNameHero] = useState('');
    const [descriptionHero, setDescriptionHeroero] = useState('');
    const [elementHero, setElementHero] = useState('');
    const [elements, setElements] = useState([]);

    // console.log(nameHero, descriptionHero, elementHero)

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setElements(data))
        // eslint-disable-next-line
    }, []);

    
    // console.log(filters)
    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            id: uuidv4(),
            name: `${nameHero}`,
            description: `${descriptionHero}`,
            element: `${elementHero}`
        }
        const json = JSON.stringify(obj)
        request(`http://localhost:3001/heroes`, 'POST', json)
            .then(data => dispatch(heroesAdd(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    return (
        <form  onSubmit={(e) => handleSubmit(e)}
            className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input onChange={(e) => setNameHero(e.target.value)}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea onChange={(e) => setDescriptionHeroero(e.target.value)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select onChange={(e) => setElementHero(e.target.value)}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    {elements.map(el => {
                        return (
                            <option key={el.id} value={el.element}>{el.description}</option>
                        )
                    })}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;


// dispatch(heroesAdd(data))