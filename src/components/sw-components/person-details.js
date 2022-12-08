import React from "react";
//import { SwapiServiceConsumer } from '../swapi-service-context';
import ItemDetails from '../person-details';
import Record from '../record';
import { withSwapiService } from "../hoc-helpers";

// const PersonDetails = ({ itemId, swapiService }) => {
const PersonDetails = (props) => {
    // const { getPerson, getPersonImage } = swapiService;
    // return (
    //     <SwapiServiceConsumer>
    //         {
    //             ({ getPerson, getPersonImage }) => {
    return (
        <ItemDetails {...props}>
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
}
// }
{/* <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getPersonImage}  >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails> */}
//     </SwapiServiceConsumer>
// )
// };

export default withSwapiService(mapMethodsToProps)(PersonDetails);
// когда PersonDetails будет вызываться withSwapiService позаботится о том,чтобы в св-вах этого компонента в пропсах было свойство swapiService