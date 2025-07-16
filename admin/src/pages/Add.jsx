import { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";


const Add = ({ token }) => {
  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ category, setCategory ] = useState("Men");
  const [ subCategory, setSubCategory ] = useState("Cap");
  const [ sizes, setSizes ] = useState([]);
  const [ bestseller, setBestseller ] = useState(false);
  
  const [ image1, setImage1 ] = useState(false);
  const [ image2, setImage2 ] = useState(false);
  const [ image3, setImage3 ] = useState(false);
  const [ image4, setImage4 ] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Creating Form Data
      const formData = new FormData();

      // Appending Product Details To Form Data
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      // Appending Images To Form Data
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

			// Sending Post Request
			const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}});
			
			// Validating Response
			if (response.data.success) {
        console.log(response.data);
				toast(response.data.message);
        
        // Clearing Form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Cap");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
			} else {
				toast(response.data.message);
			}
		} catch (error) {
			// Logging Error
			console.log(error);
			toast(error.message);
		}
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">
      <div className="w-full">
        <p className="mb-2 font-title text-black">Upload Image</p>
        <div className="grid grid-cols-2 sm:flex gap-2">
          <label htmlFor="image1">
            <img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="border border-black border-dashed w-full h-40 sm:w-40 object-cover" src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-title text-black">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="w-full px-4 py-2 border border-black" placeholder="Enter Value" required />
      </div>

      <div className="w-full">
        <p className="mb-2 font-title text-black">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" rows="4" className="w-full px-4 py-2 border border-black" placeholder="Enter Value" required />
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div>
          <p className="mb-2 font-title text-black">Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full sm:w-[125px] px-4 py-2 border border-black">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-title text-black">Type</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full sm:w-[125px] px-4 py-2 border border-black">
            <option value="Cap">Cap</option>
            <option value="Shoes">Shoes</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-title text-black">Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" className="w-full sm:w-[125px] px-4 py-2 border border-black" min={1} placeholder="Price" required />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-title text-black">Product Sizes</p>
        <div className="grid grid-cols-3 sm:flex gap-2">
          <p onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} className={`${sizes.includes("S") ? "bg-black text-white" : "bg-white"} border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer`}>S</p>
          <p onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} className={`${sizes.includes("M") ? "bg-black text-white" : "bg-white"} border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer`}>M</p>
          <p onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} className={`${sizes.includes("L") ? "bg-black text-white" : "bg-white"} border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer`}>L</p>
          <p onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} className={`${sizes.includes("XL") ? "bg-black text-white" : "bg-white"} border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer`}>XL</p>
          <p onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} className={`${sizes.includes("XXL") ? "bg-black text-white" : "bg-white"} border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer`}>XXL</p>
        </div>
      </div>

      <div className="flex gap-4 items-center my-2">
        <input onChange={(e) => setBestseller(prev => !prev)} checked={bestseller} className="w-5 h-5 border border-black" type="checkbox" id="bestseller" />
        <label className="cursor-pointer h-5" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button className="w-full sm:w-auto font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500" type="submit">ADD PRODUCT</button>
    </form>
  )
}

export default Add