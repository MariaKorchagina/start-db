import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';
// import PersonDetails from '../person-details';
import ItemDetails from '../person-details';

import Record from '../record';
import Row from '../row';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service'
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  LoginPage,
  SecretPage
} from '../pages';
import DynamicalStarshipsDetails from "../dynamical-starships-details";
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import StarshipDetails from '../sw-components/starship-details';
export default class App extends Component {

  //swapiService = new DummySwapiService(),

  state = {
    //  showRandomPlanet: true,
    swapiService: new SwapiService(),
    hasError: false,
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

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
    // const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const { isLoggedIn } = this.state;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <BrowserRouter>
            <div className='stardb-app'>
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
     
                <Routes to="/">
        
                  <Route path="/" element={<h2>Welcome to Star Wars</h2>} />
                  <Route path="/people" element={<PeoplePage />} />
                  <Route path="/people/:id" element={<PeoplePage />} />
                  <Route path="/planets" element={<PlanetPage />} />
                  <Route path="/starships" element={<StarshipPage />} />
                  <Route path="/starships/:id" element={<DynamicalStarshipsDetails />} />
                  <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />} />
                  <Route path="/secret" element={<SecretPage isLoggedIn={isLoggedIn} />} />
                  <Route element={<h2>Page not found</h2>} />

                </Routes>
         
            </div>
          </BrowserRouter>
        </SwapiServiceProvider>
      </ErrorBoundry >

      // {/* {planet} */}
      // {/* <RandomPlanet updateInterval={2000} /> */}
      // {/* {({ name }) => <span>{name}</span>}
      // </PersonList> */}

      // {/* <Row
      //     left={<PlanetList />}
      //     right={<PlanetDetails itemId={5} />} />


      //   {/* 
      // <div className='row mb2'>
      //   <div className='col-md-6'>
      //     <ItemList
      //       onItemSelected={this.onPersonSelected}
      //       getData={this.swapiService.getAllPlanets}
      //       renderItem={(item) => (
      //         <span>{item.name}<button>!</button></span>
      //       )} />
      //   </div>
      //   <div className='col-md-6'>
      //     <PersonDetails personId={this.state.selectedPerson} />
      //   </div>
      // </div>

      // <div className='row mb2'>
      //   <div className='col-md-6'>
      //     <ItemList
      //       onItemSelected={this.onPersonSelected}
      //       getData={this.swapiService.getAllStarships}
      //       renderItem={(item) => item.name} />
      //   </div>
      //   <div className='col-md-6'>
      //     <PersonDetails personId={this.state.selectedPerson} />
      //   </div>
      // </div> */}


    );
  };
}