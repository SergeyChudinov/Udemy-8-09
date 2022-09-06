import { useState } from "react";
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';

import { useCreateHeroMutation } from "../../api/apiSlice"; 

const HeroesAddForm = () => {
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const [nameHero, setNameHero] = useState('');
    const [descriptionHero, setDescriptionHeroero] = useState('');
    const [elementHero, setElementHero] = useState('');

    const [createHero] = useCreateHeroMutation()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const obj = {
            id: uuidv4(),
            name: `${nameHero}`,
            description: `${descriptionHero}`,
            element: `${elementHero}`
        }
        createHero(obj).unwrap();  
        e.target.reset()
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                if (name === 'all')  return;
                return <option key={name} value={name}>{label}</option>
            })
        }
    }
    return (
        <form  onSubmit={(e) => onSubmitHandler(e)}
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
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;

