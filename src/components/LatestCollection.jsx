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
                <p className='w-2/3 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quis minus, optio illum blanditiis sunt.
                </p>
            </div>
        </div>
    )
}

export default LatestCollection