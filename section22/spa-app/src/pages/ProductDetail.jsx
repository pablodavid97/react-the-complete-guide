import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
    const { productId } = useParams();

    return (
        <>
            <h1>Product Details</h1>
            <p>Details page for product {productId}</p>
            <p>
                <Link to='..' relative='path'>
                    Back
                </Link>
            </p>
        </>
    );
}

export default ProductDetail;
