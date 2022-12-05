import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

//withData - получает данные и отображает состояние в правильном виде( если данные загружаются, то спиннер, если нет - то др компоненты)
const withData = (View) => {

    return class extends Component {
        //  swapiService = new SwapiService;
        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            }
        }
        componentDidMount() {
            // const { getData } = this.props;
            //  this.swapiService.getAllPeople()
            this.update();
        }

        update() {
            this.setState({
                loading: true,
                error: false
            });
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    })
                })
        }

        render() {

            const { data, loading, error } = this.state;

            if (loading) {
                return <Spinner />
            }

            if (error) {
                return <ErrorIndicator />
            }

            return <View
                {... this.props}
                data={data} />
        }
    }
}

export default withData;

// withData - ф-ция для того,чтобы можно было выбрать какой именно компонент  будет заниматься отображением  данных
