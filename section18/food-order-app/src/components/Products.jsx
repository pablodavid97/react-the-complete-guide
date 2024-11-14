import Product from './Product';

const Products = ({ products }) => {
    return (
        <ul id='meals'>
            {products.map((product) => {
                return (
                    <li className='meal-item' key={product.id}>
                        <Product product={product} />
                    </li>
                );
            })}
        </ul>
    );
};

export default Products;
