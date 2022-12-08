import React from "react";

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

export default withChildFunction;

//withChildFunction - берет любой компонент и устанавливает в качестве children - заданную ф-цию (fn)
