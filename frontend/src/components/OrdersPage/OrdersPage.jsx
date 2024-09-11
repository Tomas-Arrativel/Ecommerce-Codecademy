import React, { useContext } from "react";
import "./OrdersPage.css";
import { OrdersContext } from "../../contexts/OrdersContext";

const OrdersPage = () => {
	const { orders, loading } = useContext(OrdersContext);

	return (
		<div className="orders">
			{loading ? (
				<div className="orders-loading">Loading... please wait</div>
			) : (
				<table className="orders__container">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Total Price</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr
								key={order.order_id}
								className="orders__container-order"
								style={{
									backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
								}} // Optional: Alternating row colors
							>
								<td>{order.order_id}</td>
								<td>{order.total_price}</td>
								<td>
									{new Date(order.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long", // 'short' for abbreviated month
										day: "numeric",
									})}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default OrdersPage;
