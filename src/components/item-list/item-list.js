import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import './item-list.css';
import { withData } from '../hoc-helpers';

const ItemList = (props) => {

    // renderItems(arr) {
    //     // return arr.map(({ id, name }) => {
    //     return arr.map((item) => {
    //         const { id } = item;
    //         const label = this.props.renderItem(item);
    //         return (
    //             <li className='list-group-item'
    //                 key={id}
    //                 onClick={() => this.props.onItemSelected(id)}>
    //                 {label}
    //             </li>
    //         )
    //     })
    // }


    const { data, onItemSelected, children: renderLabel } = props;

    const items = data.map((item) => {
        const { id } = item;
        // const label = this.props.renderItem(item);
        const label = renderLabel(item);
        return (
            <li className='list-group-item'
                key={id}
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        );
    });


    return (
        <ul className='item-list list-group'>
            {items}
        </ul>
    );
}


// const withData = (View, getData) => {


//     return class extends Component {
//         //  swapiService = new SwapiService;

//         state = {
//             data: null
//         };

//         componentDidMount() {

//             // const { getData } = this.props;
//             //  this.swapiService.getAllPeople()
//             getData()
//                 .then((data) => {
//                     this.setState({
//                         data
//                     });
//                 });
//         }

//         render() {

//             const { data } = this.state;

//             if (!data) {
//                 return <Spinner />
//             }

//             return <View
//                 {... this.props}
//                 data={data} />
//         }
//     }
// }

const {getAllPeople} = new SwapiService();

export default withData(ItemList, getAllPeople);

// withData - ф-ция для того,чтобы можно было выбрать какой именно компонент  будет заниматься отображением  данныз