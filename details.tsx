import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

const Details: FunctionComponent = () => {
    const params = useParams();
    return (
        <>
        <h1>
        Details of {params.id}
        </h1>
        </>
    );

   
}

export default Details;