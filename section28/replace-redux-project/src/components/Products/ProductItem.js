import { memo } from 'react';
import Card from '../UI/Card';
import './ProductItem.css';

import { useStore } from '../../hooks-store/store';

const ProductItem = memo(({ id, title, isFav, description }) => {
    console.log('RENDERING');
    const dispatch = useStore(false)[1];
    const toggleFavHandler = () => {
        dispatch('TOGGLE_FAV', id);
    };

    return (
        <Card style={{ marginBottom: '1rem' }}>
            <div className='product-item'>
                <h2 className={isFav ? 'is-fav' : ''}>{title}</h2>
                <p>{description}</p>
                <button
                    className={!isFav ? 'button-outline' : ''}
                    onClick={toggleFavHandler}
                >
                    {isFav ? 'Un-Favorite' : 'Favorite'}
                </button>
            </div>
        </Card>
    );
});

export default ProductItem;
