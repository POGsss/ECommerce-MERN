import { useState, useEffect } from "react";

const EditDialog = ({ visible, product, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        sizes: product.sizes ? product.sizes.join(", ") : "",
      });
    }
  }, [product]);

  if (!visible) return null;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const formattedData = {
        ...formData,
        sizes: JSON.stringify(
        formData.sizes
            .split(",")
            .map(size => size.trim())
            .filter(size => size !== "")
        )
    };
    onSave(formattedData);
  };

  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center p-8 z-50">
      <div className="flex flex-col w-full max-w-[400px] bg-light-light gap-4 p-4 rounded-[20px]">
        <h1 className="font-title text-xl">Edit Product</h1>
        <div className="flex flex-col gap-2">
            <label className="text-sm">Name</label>
            <input  type="text" name="name" value={formData.name} onChange={handleChange} className="bg-light-dark rounded-[10px] p-2"/>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm">Description</label>
            <textarea name="description" type="text" rows="4" value={formData.description} onChange={handleChange} className="bg-light-dark rounded-[10px] p-2"/>
        </div>
        <div className="flex flex-row justify-between items-center w-full gap-4">
            <div className="flex flex-col gap-2 w-[calc(50%-10px)]">
                <label className="text-sm">Price</label>
                <input  type="number" name="price" value={formData.price} onChange={handleChange} className="bg-light-dark rounded-[10px] p-2"/>
            </div>
            <div className="flex flex-col gap-2 w-[calc(50%-10px)]">
                <label className="text-sm">Category</label>
                <input  type="text" name="category" value={formData.category} onChange={handleChange} className="bg-light-dark rounded-[10px] p-2"/>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm">Sub-Category</label>
            <input  type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} className="bg-light-dark rounded-[10px] p-2"/>
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-sm">Sizes</label>
            <input  type="text" name="sizes" value={formData.sizes} onChange={handleChange} className="bg-light-dark rounded-[10px] p-2"/>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 mt-2">
          <button onClick={onCancel} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-secondary rounded-[10px] text-white cursor-pointer active:bg-primary active:text-black">CANCEL</button>
          <button onClick={handleSave} className="flex-1 w-full font-text md:text-base px-8 py-4 bg-primary rounded-[10px] text-black cursor-pointer active:bg-secondary active:text-white">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;