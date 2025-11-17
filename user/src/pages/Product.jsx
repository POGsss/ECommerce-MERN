import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets";
import axios from "axios";
import VirtualTryOn from "../components/VirtualTryOn.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [ productData, setProductData ] = useState(false);
  const [ image, setImage ] = useState("");
  const [ convertedImage, setConvertedImage ] = useState(null);
  const [ size, setSize ] = useState("");
  const [ activeTab, setActiveTab ] = useState("guide");
  const [ reviews, setReviews ] = useState([]);
  const [ratingAverage, setRatingAverage] = useState(0);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        setReviews(item.reviews);

        if (item.reviews && item.reviews.length > 0) {
          const totalRating = item.reviews.reduce((acc, review) => acc + review.rating, 0);
          const average = totalRating / item.reviews.length;
          setRatingAverage(average.toFixed(1));
        } else {
          setRatingAverage(0);
        }
        
        return null;
      }
    });
  }

  const convertImage = async (image) => {
    const response = await axios.get(image, {responseType: "blob",});
    const myBlob = response.data;
    const myFile = new File([myBlob], "garment.jpg", {type: "image/jpeg"});
    return myFile;
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  useEffect(() => {
    if (image) {
      convertImage(image).then((file) => {
        setConvertedImage(file);
      });
    }
  }, [image]);

  return productData ? (
    <div className="max-w-[1280px] m-auto my-10">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-2 sm:flex-row">
          <div className="flex flex-row gap-2 sm:flex-col overflow-x-auto sm:overflow-y-auto sm:justify-normal sm:w-[17.5%] w-full">
            {
              productData.image.map((image, index) => (
                <img key={index} onClick={() => setImage(image)} className="rounded-[5px] w-[20%] sm:w-full flex-shrink-0 cursor-pointer" src={image} alt="" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded-[10px]" src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-subtitle text-2xl mt-2">{productData.name}</h1>
          <p className="font-text mt-2 text-gray-500">Rating: {ratingAverage > 0 ? `${ratingAverage}` : "0"}</p>
          <p className="font-subtitle text-3xl my-4">{currency}{productData.price}</p>
          <p className="font-text mt-2 text-gray-500">{productData.description}</p>
          <div className="flex flex-col gap-2 my-8">
            <p className="font-subtitle">Select Size:</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`rounded-[10px] px-4 py-2 bg-light-light border hover:bg-light-dark ${item === size ? "bg-secondary text-white hover:bg-secondary" : ""}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="font-text md:text-base px-8 py-4 bg-secondary text-white cursor-pointer active:bg-primary active:text-black rounded-[10px] disabled:active:bg-dark-dark disabled:active:text-white disabled:bg-dark-dark" disabled={!productData.available}>{productData.available ? `ADD TO CART` : `SOLD OUT`}</button>
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
          <p onClick={() => setActiveTab("guide")} className={`font-subtitle rounded-t-[10px] px-6 py-3 text-sm cursor-pointer ${activeTab === "guide" ? "bg-light-light" : "bg-light-dark text-gray-600"}`}><span className="hidden sm:inline">Product</span> Guide</p>
          <p onClick={() => setActiveTab("review")} className={`font-subtitle rounded-t-[10px] px-6 py-3 text-sm cursor-pointer ${activeTab === "review" ? "bg-light-light" : "bg-light-dark text-gray-600"}`}><span className="hidden sm:inline">Product</span> Review</p>
        </div>

        {/* Tab Content */}
        <div className={`flex flex-col gap-4 bg-light-light rounded-[10px]  ${activeTab === "guide" ? "rounded-tl-none" : ""} p-6 text-sm text-gray-500`}>
          {activeTab === "guide" ? (
            <>
              <p> Choosing the right size ensures both comfort and confidence in every wear. Below is our detailed product size chart designed to help you find your perfect fit. Please note that measurements may vary slightly depending on the product type and material.</p>
              <div className="w-full overflow-y-scroll rounded-[5px]">
                <table className="w-full min-w-[700px] text-sm">
                  <thead>
                    <tr className="bg-primary font-title text-black">
                      <th className="text-left p-2 w-[calc(100% - 500px)]">Product</th>
                      <th className="text-center p-2 w-[100px]">S</th>
                      <th className="text-center p-2 w-[100px]">M</th>
                      <th className="text-center p-2 w-[100px]">L</th>
                      <th className="text-center p-2 w-[100px]">XL</th>
                      <th className="text-center p-2 w-[100px]">XXL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-light-dark">
                      <td className="text-left p-2">Cap</td>
                      <td className="text-center p-2">1/8</td>
                      <td className="text-center p-2">2/8</td>
                      <td className="text-center p-2">3/8</td>
                      <td className="text-center p-2">4/8</td>
                      <td className="text-center p-2">5/8</td>
                    </tr>
                    <tr className="bg-light-light">
                      <td className="text-left p-2">Shoes</td>
                      <td className="text-center p-2">36</td>
                      <td className="text-center p-2">38</td>
                      <td className="text-center p-2">40</td>
                      <td className="text-center p-2">42</td>
                      <td className="text-center p-2">44</td>
                    </tr>
                    <tr className="bg-light-dark">
                      <td className="text-left p-2">Clothing</td>
                      <td className="text-center p-2">04</td>
                      <td className="text-center p-2">06</td>
                      <td className="text-center p-2">08</td>
                      <td className="text-center p-2">10</td>
                      <td className="text-center p-2">12</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="flex flex-col text-sm p-2 gap-2">
                      <div className="relative flex flex-row justify-start items-center gap-2">
                        <img className="w-[75px] rounded-[100%] p-2 bg-light-dark" src={assets.user_icon} alt="" srcset="" />
                        <div className="w-full overflow-hidden">
                          <p className="font-subtitle text-black">{review.name}</p>
                          <p className="text-ellipsis overflow-hidden whitespace-nowrap">{review.email}</p>
                          <p className="relative text-lg sm:absolute sm:text-2xl top-0 right-0 text-primary">{"★".repeat(review.rating)}</p>
                        </div>
                      </div>
                      <p className="bg-light-dark p-4 rounded-[5px]">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No Review Available</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      {/* Virtual Try-On Component */}
      <VirtualTryOn image={convertedImage} />
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product;