import { useContext, useState, useEffect, use } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
import VirtualTryOn from "../components/VirtualTryOn.jsx";

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
	}, [category, subCategory, search, showSearch, products]);

	useEffect(() => {
		sortProducts();
	}, [sortType]);

	return (
		<div className="max-w-[1280px] m-auto flex flex-col sm:flex-row sm:gap-10 my-10">
			{/* Left Side */}
			<div className="min-w-[200px] md:min-w-[250px]">
				{/* Category Filter */}
				<div className={`rounded-[10px] bg-light-light p-5 py-3 ${showFilter ? "" : "hidden"} sm:block`}>
					<p className="mb-3 text-sm font-subtitle">CATEGORIES</p>
					<div className="flex flex-col gap-2 text-sm font-text text-gray-500">
						<p className="flex gap-2">
							<input className="w-3 accent-black" type="checkbox" value={"Men"} onChange={toggleCategory} /> Men
						</p>
						<p className="flex gap-2">
							<input className="w-3 accent-black" type="checkbox" value={"Women"} onChange={toggleCategory} /> Women
						</p>
						<p className="flex gap-2">
							<input className="w-3 accent-black" type="checkbox" value={"Kids"} onChange={toggleCategory} /> Kids
						</p>
					</div>
				</div>

				{/* SubCategory Filter */}
				<div className={`rounded-[10px] bg-light-light p-5 py-3 mt-4 mb-6 ${showFilter ? "" : "hidden"} sm:block`}>
					<p className="mb-3 text-sm font-subtitle">TYPE</p>
					<div className="flex flex-col gap-2 text-sm font-text text-gray-500">
						<p className="flex gap-2">
							<input className="w-3 accent-black" type="checkbox" value={"Cap"} onChange={toggleSubCategory} /> Cap
						</p>
						<p className="flex gap-2">
							<input className="w-3 accent-black" type="checkbox" value={"Shoes"} onChange={toggleSubCategory} /> Shoes
						</p>
						<p className="flex gap-2">
							<input className="w-3 accent-black" type="checkbox" value={"Clothing"} onChange={toggleSubCategory} /> Clothing
						</p>
					</div>
				</div>
			</div>

			{/* Right Side */}
			<div className="w-full flex-2">
				<div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center text-2xl mb-3">
					<Title text1={"ALL"} text2={"COLLECTIONS"} />

					{/* Product Sort */}
					<div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
						<select className="w-full rounded-[10px] text-sm px-4 py-2 pr-10" onChange={(e) => setSortType(e.target.value)}>
							<option value="relevant"className="bg-light-dark outline-none">Relevant</option>
							<option value="low-high" className="bg-light-dark outline-none">Low-High</option>
							<option value="high-low" className="bg-light-dark outline-none">High-Low</option>
						</select>
						<img onClick={() => setShowFilter(!showFilter)} className="block sm:hidden h3" src={assets.filter_icon} alt="" />
					</div>
				</div>

				{/* Map Products */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
					{
						filterProducts.map((item, index) => (
							<ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
						))
					}
				</div>
			</div>

			{/* Virtual Try-On Component */}
			<VirtualTryOn />
		</div>
	)
}

export default Collection;