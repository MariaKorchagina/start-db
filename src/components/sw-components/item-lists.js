import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';
//import SwapiService from '../../services/swapi-service';

// const swapiService = new SwapiService();

// const {
//     getAllPeople,
//     getAllStarships,
//     getAllPlanets
// } = swapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

//withChildFunction - берет любой компонент и устанавливает в качестве children - заданную ф-цию (fn)

const renderName = ({ name }) => <span>{name}</span>

const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};
// БЫЛО - const PersonList = withData(ItemList, getAllPeople);

const PersonList = withSwapiService(
    withData(
        withChildFunction(ItemList, renderName)),
    mapPersonMethodsToProps);

const PlanetList = withSwapiService(
    withData(withChildFunction(ItemList, renderName)),
    mapPlanetMethodsToProps);

const StarshipList = withSwapiService(
    withData(withChildFunction(ItemList, renderModelAndName)),
    mapStarshipMethodsToProps);

//в каждом компоненте берется за основу ItemList , затем ItemList проходит через ф-цию withChildFunction . Это создает новый компонент, у к-ого установлена ф-ция, к-я будет рендерить child элементы из этого списка. Далее все это передается в ф-цию withData и она оборачивает компонент в более сложный компонент , к-й занимается получением данных и обработкой ошибок.


export {
    PersonList,
    PlanetList,
    StarshipList
}