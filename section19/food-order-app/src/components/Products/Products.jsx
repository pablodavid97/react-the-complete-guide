import Product from './Product';

const Products = ({ products }) => {
    return (
        <ul id='meals'>
            {products.map((product) => {
                return <Product key={product.id} product={product} />;
            })}
        </ul>
    );
};

export default Products;
