import React, { useContext } from "react";
import "./OrdersPage.css";
import { OrdersContext } from "../../contexts/OrdersContext";
import { Link } from "react-router-dom";

const OrdersPage = () => {
	const { orders, loading } = useContext(OrdersContext);

	return (
		<div className="orders">
			{loading ? (
				<div className="orders-loading">Loading... please wait</div>
			) : orders.length < 1 ? (
				<div>
					<p>
						It seems like you haven't bought anything yet,{" "}
						<Link to="/">search for a product here</Link>.
					</p>
				</div>
			) : (
				<div className="orders__table-container">
					<table className="orders__table">
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
									className="orders__table-row"
									style={{
										backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
									}} // Optional: Alternating row colors
								>
									<td data-label="Order ID">{order.order_id}</td>
									<td data-label="Total Price">{order.total_price}</td>
									<td data-label="Date">
										{new Date(order.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default OrdersPage;
