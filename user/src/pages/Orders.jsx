import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { toast } from 'react-toastify';
import Title from '../components/Title.jsx';
import Dialog from '../components/Dialog.jsx';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [ orderData, setOrderData ] = useState([]);
  const [ showDialog, setShowDialog ] = useState(false);
  const [ productId, setProductId ] = useState(null);
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState("");

  const handleReviewItem = async (_id) => {
    setProductId(_id);
    setShowDialog(true);
  };

  const handleCancelReview = () => {
    setShowDialog(false);
  }

  const handleConfirmReview = () => {
    submitReview();
    setShowDialog(false);
  }

  const submitReview = async () => {
    try {
      // Checking If User Logged In
      if (!token) {
        return null;
      }

      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/product/review", { productId, rating, comment }, { headers: { token } });
      if (response.data.success) {
        toast(response.data.message);
        setRating(0);
        setComment("");
      }

    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.response.data.message);
    }
  };

  const handleReceiveItem = async (orderId) => {
    try {
      // Checking If User Logged In
      if (!token) {
        return null;
      }

      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/receive", { orderId, status: "Completed", payment: true }, { headers: { token } });

      if (response.data.success) {
        fetchOrders();
        toast(response.data.message);
      }
    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      // Checking If User Logged In
      if (!token) {
        return null;
      }

      // Sending Request To Backend
      const response = await axios.post(backendUrl + "/api/order/user", {}, { headers: { token } });

      // Creating Order Data
      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order._id;

            allOrders.push(item);
          });
        });
        setOrderData(allOrders.reverse());
      }
    } catch (error) {
      // Logging Error
      console.log(error);
      toast(error.message);
    }
  }

  useEffect(() => {
      fetchOrders();
  }, [token]);

  return (
    <div className="max-w-[1280px] mx-auto my-10">
      <Dialog
        rating={rating}
        comment={comment}
        setRating={setRating}
        setComment={setComment}
        visible={showDialog}
        onCancel={handleCancelReview}
        onConfirm={handleConfirmReview}
      />

      <div className="font-subtitle text-2xl pb-4">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} id="orderList" className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-[10px]">
            <div className="flex items-center gap-6 text-sm">
              <img className="w-16 sm:w-20 rounded-[5px]" src={item.image[0]} alt="" />
              <div>
                <p className="text-base sm:text-lg font-subtitle">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm sm:text-base">{currency}{item.price}</p>
                    <p className="text-sm sm:text-base">Qty: {item.quantity}</p>
                    <p className="text-sm sm:text-base">Size: {item.size}</p>
                  </div>
                  <p>Date: <span className="text-sm sm:text-base text-gray-500">{new Date(item.date).toDateString()}</span></p>
                  <p>Payment: <span className="text-sm sm:text-base text-gray-500">{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="min-w-3 h-3 rounded-full bg-primary"></p>
                <p className="text-sm sm:text-base">{item.status}</p>
              </div>
              {item.status === "Delivered" ? (
                <button onClick={() => handleReceiveItem(item.orderId)} className="field rounded-[5px] px-4 py-2 text-sm">Receive Order</button>
              ) : item.status === "Completed" ? (
                <button onClick={() => handleReviewItem(item._id)} className="field rounded-[5px] px-4 py-2 text-sm">Review Order</button>
              ) : (
                <button onClick={fetchOrders} className="field rounded-[5px] px-4 py-2 text-sm">Track Order</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;