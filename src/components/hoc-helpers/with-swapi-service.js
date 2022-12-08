import React from "react";
import SwapiService from "../../services/swapi-service";
import { SwapiServiceConsumer } from "../swapi-service-context";

// const withSwapiService = (Wrapped, mapMethodsToProps) => {
const withSwapiService = (mapMethodsToProps) => (Wrapped) => {
    return (props) => {
        return (<SwapiServiceConsumer>
            {
                (swapiService) => {
                    const serviceProps = mapMethodsToProps(swapiService)
                    return (
                        <Wrapped {...props}
                            swapiService={swapiService} {...serviceProps} />
                    )
                }
            }
        </SwapiServiceConsumer>
        );
        // <Wrapped {...props} />
    }
}

export default withSwapiService;