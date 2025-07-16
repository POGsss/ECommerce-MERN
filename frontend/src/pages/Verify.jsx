import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
	const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
	const [ searchParams, setSearchParams ] = useSearchParams();

	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");

	const verifyPpayment = async () => {
		try {
			if (!token) {
				return null;
			}
			
			const response = await axios.post(backendUrl + "/api/order/verifyStripe", { success, orderId }, { headers: { token } });

			if (response.data.success) {
				setCartItems({});
				navigate("/orders");
			} else {
				navigate("/cart");
			}
		} catch (error) {
			// Logging Error
			console.log(error);
			toast(error.message);
		}
	}

	useEffect(() => {
		verifyPpayment();
	}, [token]);

	return (
		<div>

		</div>
	)
}

export default Verify;