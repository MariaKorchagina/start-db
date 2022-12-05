import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';
// import PersonDetails from '../person-details';
import ItemDetails from '../person-details';

import Record from '../record';
import Row from '../row';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service'

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

export default class App extends Component {

  //swapiService = new DummySwapiService(),

  state = {
    showRandomPlanet: true,
    swapiService: new DummySwapiService(),
    hasError: false
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService;

        console.log('switched', Service.name)
        return {
          swapiService: new Service()
        }
    })
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    console.log('componenDidCatch()');
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage
    } = this.state.swapiService;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}  >
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    )

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage} >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    )

    return (
      <div className='stardb-app'>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Header onServiceChange={this.onServiceChange} />
          {/* {planet} */}
          <PersonDetails itemId={11} />
          <PlanetDetails itemId={5} />
          <StarshipDetails itemId={9} />
          <PersonList />
          {/* {({ name }) => <span>{name}</span>}
        </PersonList> */}

          <StarshipList />
          {/* {({ name }) => <span>{name}</span>}
        </StarshipList> */}

          <PlanetList />
          {/* {({ name }) => <span>{name}</span>}
        </PlanetList> */}

          {/* <PersonDetails /> */}

          <Row
            left={personDetails}
            right={starshipDetails} />

          {/* <div className='row mb2 button-row'>
          <ErrorButton />
        </div> */}

          {/* <PeoplePage /> */}

          {/* 
        <div className='row mb2'>
          <div className='col-md-6'>
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={(item) => (
                <span>{item.name}<button>!</button></span>
              )} />
          </div>
          <div className='col-md-6'>
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className='row mb2'>
          <div className='col-md-6'>
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name} />
          </div>
          <div className='col-md-6'>
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div> */}
        </SwapiServiceProvider>
      </div>
    );
  };
}