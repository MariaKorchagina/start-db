import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';


//withData - получает данные и отображает состояние в правильном виде( если данные загружаются, то спиннер, если нет - то др компоненты)
const withData = (View) => {

    return class extends Component {
        //  swapiService = new SwapiService;
        state = {
            data: null
        };

        componentDidMount() {

            // const { getData } = this.props;
            //  this.swapiService.getAllPeople()
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                });
        }

        render() {

            const { data } = this.state;

            if (!data) {
                return <Spinner />
            }

            return <View
                {... this.props}
                data={data} />
        }
    }
}

export default withData;

// withData - ф-ция для того,чтобы можно было выбрать какой именно компонент  будет заниматься отображением  данных
 