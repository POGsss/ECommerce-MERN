import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Stocks = ({ token }) => {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchList = async () => {
        try {
            // Sending Get Request
            const response = await axios.get(backendUrl + "/api/product/list");

            // Checking If Response Is Successful
            if (response.data.success) {
                setList(response.data.products);
                console.log(list);
            } else {
                toast(response.data.message);
            }
        } catch (error) {
            // Logging Error
            console.log(error);
            toast(error.message);
        }
    }

    const handleToggle = async (productId, currentValue) => {
        try {
            const response = await axios.post(backendUrl + "/api/product/availability", { productId, available: !currentValue }, {headers: {token}});

            if (response.data.success) {
                toast("Product status updated");

                // Update UI instantly
                setList(prev =>
                    prev.map(item =>
                        item._id === productId ? { ...item, available: !currentValue } : item
                    )
                );
            } else {
                toast(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    // Pagination Logic
    const totalPages = Math.ceil(list.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedList = list.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            {/* List Header */}
            <p className="mb-2 font-title text-black">All Items Stocks</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:flex md:flex-col gap-4">
                {/* List Header */}
                <div className="hidden lg:grid grid-cols-[100px_5fr_2fr_1fr_100px] items-center py-1 px-2 bg-light-light rounded-[5px] text-sm gap-2">
                    <b className="">Image</b>
                    <b className="">Name</b>
                    <b className="">Category</b>
                    <b className="">Price</b>
                    <b className="text-center">Action</b>
                </div>
                {/* List Data */}
                {paginatedList.map((item, index) => {
                    const toggleId = `toggle-${index}`;

                    return (
                        <div className="relative grid lg:grid-cols-[100px_5fr_2fr_1fr_100px] items-start lg:items-center gap-2 p-2 bg-light-light rounded-[10px] text-sm" key={index}>
                            <img className="w-full bg-light-light rounded-[5px]" src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <label htmlFor={toggleId} className="absolute right-2 bottom-2 lg:relative lg:right-0 lg:bottom-0 flex flex-row justify-center items-center gap-2 cursor-pointer">
                                <input id={toggleId} type="checkbox" value="" className="sr-only peer" checked={item.available} onChange={() => handleToggle(item._id, item.available)}/>
                                <div className="relative w-9 h-5 bg-light-dark rounded-[5px] peer peer-checked:after:translate-x-full peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-light-light after:rounded-[5px] after:h-4 after:w-4 after:transition-all"></div>
                            </label>
                        </div>
                    )
                }
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center gap-4 mt-4">
                <span className="px-2 py-1 bg-light-light rounded-[5px]">{currentPage} / {totalPages}</span>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 bg-light-light rounded-[5px] disabled:opacity-50">Prev</button>
                    <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 bg-light-light rounded-[5px] disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    )
}

export default Stocks;