// import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import TransitionModul from '../heroesList/HeroesList';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                {/* <HeroesList/> */}
                <TransitionModul/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;