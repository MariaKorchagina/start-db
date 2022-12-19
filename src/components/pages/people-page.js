import React, { Component } from "react";
import { PersonDetails, PersonList } from "../sw-components";
import Row from "../row";
import { useParams, useNavigate } from "react-router-dom";

const PeoplePage = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    return (
        <Row left={<PersonList onItemSelected={(id) => { navigate(`/people/${id}`); }} />}
            right={<PersonDetails itemId={id} />} />
    );
}

export default PeoplePage;

// import React, { Component } from "react";
// import { PersonDetails, PersonList } from '../sw-components';
// import Row from '../row';

// export default class PeoplePage extends Component {

//     state = {
//         selectedItem: null
//     };

//     onItemSelected = (selectedItem) => {
//         this.setState({ selectedItem });
//     };

//     render() {

//         const { selectedItem } = this.state;
//         return (
//             <Row
//                 left={<PersonList onItemSelected={this.onItemSelected} />}
//                 right={<PersonDetails itemId={selectedItem} />}
//             />
//         )
//     }
// }