import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import Title from './Title.jsx';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    console.log(products);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1="Latest" text2="Collection" />
            </div>
        </div>
    )
}

export default LatestCollection