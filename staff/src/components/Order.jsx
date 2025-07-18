import { assets } from "../assets/assets";


const Order = () => {
  return (
    <div className="w-full flex flex-col text-sm gap-2 p-2 border border-black">
			{/* Title */}
			<div className="w-full flex flex-row justify-between gap-2">
				<div className="flex flex-col justify-center">
					<b>Order Breakdown</b>
					<p>Order price breakdown</p>
				</div>
				<button className="border border-black p-2 flex flex-row gap-2 items-center justify-between">
					<img src={assets.bin_icon} alt="" />
				</button>
			</div>

			{/* Order List */}
			<div>

			</div>

			{/* Total */}
			<div>

			</div>
    </div>
  )
}

export default Order;