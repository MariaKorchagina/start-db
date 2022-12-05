import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import Spinner from '../spinner';
import './item-details.css';


export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null
  };

  // получить данные персонажа прямо в тот момент, когда компонент был создан
  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    // this.swapiService.getPerson(itemId)
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  render() {

    const { item, image } = this.state;

    if (!item) {
      return <span> Select a person from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = item;


    return (
      <div className="person-details card">

        <img className="person-image"
          // src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          src={image}
          alt="item" />

        <div className="card-body">

          <h4>{name} </h4>
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear} </span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>  */}
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}