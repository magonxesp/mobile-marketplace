import { useParams } from "react-router";

export default function Product() {
    const params = useParams()

    return (
        <h1>{params.productId}</h1>
    )
}