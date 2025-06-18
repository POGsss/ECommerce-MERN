import { assets } from "../assets/assets"


const Add = () => {
  return (
    <form className="flex flex-col w-full items-start gap-6">
      <div className="w-full">
        <p className="mb-2 font-title text-black">Upload Image</p>
        <div className="grid grid-cols-2 sm:flex gap-2">
          <label htmlFor="image1">
            <img className="border border-black border-dashed w-full sm:w-40" src={assets.upload_area} alt="" />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="border border-black border-dashed w-full sm:w-40" src={assets.upload_area} alt="" />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="border border-black border-dashed w-full sm:w-40" src={assets.upload_area} alt="" />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="border border-black border-dashed w-full sm:w-40" src={assets.upload_area} alt="" />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-title text-black">Product Name</p>
        <input type="text" className="w-full px-4 py-2 border border-black" placeholder="Enter Value" required />
      </div>

      <div className="w-full">
        <p className="mb-2 font-title text-black">Product Description</p>
        <textarea type="text" rows="4" className="w-full px-4 py-2 border border-black" placeholder="Enter Value" required />
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div>
          <p className="mb-2 font-title text-black">Category</p>
          <select className="w-full sm:w-[125px] px-4 py-2 border border-black">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-title text-black">Type</p>
          <select className="w-full sm:w-[125px] px-4 py-2 border border-black">
            <option value="Men">Cap</option>
            <option value="Women">Shoes</option>
            <option value="Kids">Clothing</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-title text-black">Price</p>
          <input type="number" className="w-full sm:w-[125px] px-4 py-2 border border-black" min={1} placeholder="Price" required />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-title text-black">Product Sizes</p>
        <div className="grid grid-cols-3 sm:flex gap-2">
          <p className="border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer">S</p>
          <p className="border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer">M</p>
          <p className="border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer">L</p>
          <p className="border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer">XL</p>
          <p className="border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer">XXL</p>
        </div>
      </div>

      <div className="flex gap-4 items-center my-2">
        <input className="w-5 h-5 border border-black" type="checkbox" id="bestseller" />
        <label className="cursor-pointer h-5" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button className="w-full sm:w-auto font-text md:text-base px-8 py-4 bg-black text-white cursor-pointer active:bg-gray-500" type="submit">ADD PRODUCT</button>
    </form>
  )
}

export default Add