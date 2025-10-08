import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import Dialog from "../components/Dialog";

const List = ({ token }) => {
  const [ list, setList ] = useState([]);
  const [ showDialog, setShowDialog ] = useState(false);
  const [ productToDelete, setProductToDelete ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);
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

  const removeProduct = async (id) => {
    try {
      // Sending Post Request
      const response = await axios.post(backendUrl + "/api/product/remove", {productId: id}, {headers: {token}});

      // Checking If Response Is Successful
      if (response.data.success) {
        toast(response.data.message);
        await fetchList();
      } else {
        toast(response.data.message);
      }
    } catch (error) {
			// Logging Error
			console.log(error);
			toast(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  // Dialog Confirmation
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowDialog(true);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete);
      setProductToDelete(null);
      setShowDialog(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Dialog Component */}
      <Dialog 
        text={"Are you sure you want to delete this product? This action cannot be undone."}
        visible={showDialog}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      {/* List Header */}
      <p className="mb-2 font-title text-black">All Product List</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:flex md:flex-col gap-4">
        {/* List Header */}
        <div className="hidden lg:grid grid-cols-[100px_5fr_2fr_1fr_50px] items-center py-1 px-2 bg-light-light rounded-[5px] text-sm gap-2">
          <b className="">Image</b>
          <b className="">Name</b>
          <b className="">Category</b>
          <b className="">Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* List Data */}
        {paginatedList.map((item, index) => (
          <div className="relative grid lg:grid-cols-[100px_5fr_2fr_1fr_50px] items-center gap-2 p-2 bg-light-light rounded-[10px] text-sm" key={index}>
            <img className="w-full bg-light-light rounded-[5px]" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <img onClick={() => handleDeleteClick(item._id)} className="absolute right-2 bottom-2 w-5 p-0 lg:relative lg:right-0 lg:bottom-0 lg:w-full lg:p-[14px] cursor-pointer" src={assets.bin_icon} alt="" />
          </div>
        ))}
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

export default List;