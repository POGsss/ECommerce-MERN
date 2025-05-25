import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [ productData, setProductData ] = useState(false);
  const [ image, setImage ] = useState("");
  const [ size, setSize ] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item.id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        
        return null;
      }
    });
  }

  useEffect(() => {
    fetchProductData();
  }, [productId]);
  
  return productData ? (
    <div className="max-w-[1280px] m-auto my-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-2 sm:flex-row">
          <div className="flex flex-row gap-2 sm:flex-col overflow-x-auto sm:overflow-y-auto sm:justify-normal sm:w-[17.5%] w-full">
            {
              productData.image.map((image, index) => (
                <img key={index} onClick={() => setImage(image)} className="border border-black w-[20%] sm:w-full flex-shrink-0 cursor-pointer" src={image} alt="" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto border border-black" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-subtitle text-2xl mt-2">{productData.name}</h1>
          <p className="font-text mt-2 text-gray-500">Sold: 0+</p>
          <p className="font-subtitle text-3xl my-4">{currency} {productData.price}</p>
          <p className="font-text mt-2 text-gray-500">{productData.description}</p>
          <div className="flex flex-col gap-2 my-8">
            <p className="font-subtitle">Select Size:</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border border-black px-4 py-2 hover:bg-black hover:text-white ${item === size ? "bg-black text-white" : ""}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className="font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500">ADD TO CART</button>
          <hr className="mt-8 sm:w-full h-[2px] bg-gray-700" />
          <div className="text-sm mt-6 text-gray-500 flex flex-col gap-1">
            <p>Cash On Delivery</p>
            <p>7 Day Refundable</p>
            <p>Top Grade Product</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex">
          <p className="font-subtitle border border-black border-b-0 px-6 py-3 text-sm">Product Policy</p>
        </div>
        <div className="flex flex-col gap-4 border border-black p-9 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.</p>
        </div>
      </div>

      {/* Related Products Section */}
      <Link>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </Link>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product