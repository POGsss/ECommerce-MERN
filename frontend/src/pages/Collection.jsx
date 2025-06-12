import { useContext, useState, useEffect, use } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";

const Collection = () => {
	const { products, search, showSearch } = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState("relevant");

	const toggleCategory = (e) => {
		const value = e.target.value;

		if (category.includes(value)) {
			setCategory(prev => prev.filter(item => item !== value));
		} else {
			setCategory(prev => [...prev, value]);
		}
	};

	const toggleSubCategory = (e) => {
		const value = e.target.value;
		if (subCategory.includes(value)) {
			setSubCategory(prev => prev.filter(item => item !== value));
		} else {
			setSubCategory(prev => [...prev, value]);
		}
	};

	const applyFilter = () => {
		let productsCopy = products.slice();

		if (showSearch && search) {
			productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
		}

		if (category.length > 0) {
			productsCopy = productsCopy.filter(item => category.includes(item.category));
		}
		
		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
		}

		setFilterProducts(productsCopy);
	}

	const sortProducts = () => {
		let filterProductsCopy = filterProducts.slice();

		switch (sortType) {
			case "low-high":
				setFilterProducts(filterProductsCopy.sort((a, b) => a.price - b.price));
				break;
			case "high-low":
				setFilterProducts(filterProductsCopy.sort((a, b) => b.price - a.price));
				break;
			default:
				applyFilter();
				break;
		}
	}

	useEffect(() => {
		applyFilter();
	}, [category, subCategory, search, showSearch]);

	useEffect(() => {
		sortProducts();
	}, [sortType]);

	return (
		<div className="max-w-[1280px] m-auto flex flex-col sm:flex-row gap-1 sm:gap-10 my-10">
			{/* Left Side */}
			<div className="min-w-[200px] md:min-w-[250px]">
			<p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 font-subtitle">
				FILTERS
				<img className={`h3 sm:hidden ${showFilter ? "rotate-180" : ""}`} src={assets.dropdown_icon} alt="" />
			</p>

			{/* Category Filter */}
			<div className={`border border-black p-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
				<p className="mb-3 text-sm font-subtitle">CATEGORIES</p>
				<div className="flex flex-col gap-2 text-sm font-text text-gray-500">
					<p className="flex gap-2">
						<input className="w-3 accent-black" type="checkbox" value={"Men"} onChange={toggleCategory}/> Men
					</p>
					<p className="flex gap-2">
						<input className="w-3 accent-black" type="checkbox" value={"Women"} onChange={toggleCategory}/> Women
					</p>
					<p className="flex gap-2">
						<input className="w-3 accent-black" type="checkbox" value={"Kids"} onChange={toggleCategory}/> Kids
					</p>
				</div>
			</div>

			{/* SubCategory Filter */}
			<div className={`border border-black p-5 py-3 mt-4 mb-6 ${showFilter ? "" : "hidden"} sm:block`}>
				<p className="mb-3 text-sm font-subtitle">TYPE</p>
				<div className="flex flex-col gap-2 text-sm font-text text-gray-500">
					<p className="flex gap-2">
						<input className="w-3 accent-black" type="checkbox" value={"Cap"} onChange={toggleSubCategory}/> Cap
					</p>
					<p className="flex gap-2">
						<input className="w-3 accent-black" type="checkbox" value={"Shoes"} onChange={toggleSubCategory}/> Shoes
					</p>
					<p className="flex gap-2">
						<input className="w-3 accent-black" type="checkbox" value={"Clothing"} onChange={toggleSubCategory}/> Clothing
					</p>
				</div>
			</div>
			</div>

			{/* Right Side */}
			<div className="w-full flex-2">
				<div className="flex flex-col sm:flex-row justify-between text-2xl mb-4">
					<Title text1={"ALL"} text2={"COLLECTIONS"} />
					
					{/* Product Sort */}
					<select className="border border-black text-sm px-2 py-2" onChange={(e) => setSortType(e.target.value)}>
						<option value="relevant">Relevant</option>
						<option value="low-high">Low-High</option>
						<option value="high-low">High-Low</option>
					</select>
				</div>

				{/* Map Products */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
					{
						filterProducts.map((item, index) => (
							<ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price}  />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Collection