import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Container} from 'react-bootstrap';
import { Transition } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = (props) => {
    const [showHeroes, setShowHeroes] = useState(props.show);
    const {heroes, heroesLoadingStatus, filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        
        // props.setShowHeroes(showHeroes => !showHeroes)
        props.setShowHeroes(true)
        
        // eslint-disable-next-line
    }, []);

    const filtePost = (items, filter) => {
        switch (filter) {
            case 'fire':
                return items.filter(item => item.element === 'fire');
            case 'water':
                return items.filter(item => item.element === 'water');
            case 'wind':
                return items.filter(item => item.element === 'wind');
            case 'earth':
                return items.filter(item => item.element === 'earth');    
            default:
                return items;             
        }
    }
    const filtredHeroes = filtePost(heroes, filters);

    const duration = 3000;
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,  //opacity visibility
        opacity: 0,
        visibility: 'hidden',
    }
    const transitionStyles = {
        entering: { opacity: 1, visibility: 'visible'  },
        entered:  { opacity: 1, visibility: 'visible'  },
        exiting:  { opacity: 0, visibility: 'hidden' },
        exited:  { opacity: 0, visibility: 'hidden' },
    };

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} id={id}/>
        })
    }

    const elements = renderHeroesList(filtredHeroes);
    return (
        <Transition timeout={duration} in={props.show}> 
            {state => (
                <ul style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {elements}
                </ul>
            )} 
            
        </Transition>
    )
}

// export default HeroesList;

function TransitionModul() {
    const [showHeroes, setShowHeroes] = useState(false);
    const [showTrigger, setShowTrigger] = useState(true);
    

    return (
        <Container>
            {<HeroesList show={showHeroes} setShowHeroes={setShowHeroes}/>}
            {showTrigger ? 
                <button 
                    type="button" 
                    className="btn btn-warning mt-5"
                    onClick={() => setShowHeroes(showHeroes => !showHeroes)}>Open Modal</button> :
                    null}
        </Container>
    );
}

export default TransitionModul ;