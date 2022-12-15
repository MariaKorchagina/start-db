import React from "react";
import { useParams } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

const DynamicalStarshipsDetails = () => {
    const { id } = useParams();
    return (<StarshipDetails itemId={id} />)
}

export default DynamicalStarshipsDetails;

//Функция useParams() возвращает набор параметров маршрута.
//Фактически такой набор представляет объект, а каждый отдельный параметр - свойство этого объекта.
//И чтобы получить параметр id, необходимо использовать выражение params.id .