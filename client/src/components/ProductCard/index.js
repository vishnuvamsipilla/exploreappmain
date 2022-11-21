import { Link } from "react-router-dom";

import "./index.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { title, brand, imageUrl, price, id } = productData;
  console.log(productData);

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <div className="product-description">
          <h1 className="title">{title}</h1>
          <p>by {brand}</p>
          <p className="price">Rs {price}/-</p>
        </div>
      </Link>
    </li>
  );
};
export default ProductCard;
