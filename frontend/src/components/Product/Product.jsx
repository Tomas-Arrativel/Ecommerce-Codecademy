import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ name, price, rating, id, img }) => {
	return (
		<div className="product" key={id}>
			<img src={img} alt={name} />
			<div className="product_info">
				<p className="product_info-name">{name}</p>
				<div className="product_info-numbers">
					<p className="product_info-numbers_price">{price}</p>
					<p className="product_info-numbers_rating">Rating {rating}</p>
				</div>
			</div>
			<Link to={`/products/id`} className="product_btn">
				See more
			</Link>
		</div>
	);
};

export default Product;
