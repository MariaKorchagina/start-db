import React from 'react';
import ItemList from '../item-list';
import {
    withData,
    withSwapiService,
    withChildFunction,
    compose
} from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';
//import SwapiService from '../../services/swapi-service';

// const swapiService = new SwapiService();

// const {
//     getAllPeople,
//     getAllStarships,
//     getAllPlanets
// } = swapiService;


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

// const PersonList = withSwapiService(
//     withData(
//         withChildFunction(ItemList, renderName)),
//     mapPersonMethodsToProps);

const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

// reduceRight- обрабатывает справа налево,(1ый эл-т  withChildFunction(renderName)). Ф-ция compose возьмет компонент comp  и передаст этой ф-йии и далее эта ф-ция перейдет в withData , далее ф-ция перейдет в withSwapiService и рез-т всего этого вернется из ф-ции compose

const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipMethodsToProps),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);

//в каждом компоненте берется за основу ItemList , затем ItemList проходит через ф-цию withChildFunction . Это создает новый компонент, у к-ого установлена ф-ция, к-я будет рендерить child элементы из этого списка. Далее все это передается в ф-цию withData и она оборачивает компонент в более сложный компонент , к-й занимается получением данных и обработкой ошибок.


export {
    PersonList,
    PlanetList,
    StarshipList
}