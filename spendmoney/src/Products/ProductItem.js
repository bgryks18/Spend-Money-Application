import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToggleFavoriteIcon, AddToCart } from "../actions/spendActions";
const ProductItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.SpendState);
  const product = { id, title, price, description, category, image, rating };
  const [piece, setPiece] = useState(0);

  const formatter = (x) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(x);
  const handleClick = () => {
    dispatch(AddToCart({ ...product, piece }));
  };
  let fv_i_class;
  if (states.favorites.find((item) => item.id === product.id)) {
    fv_i_class = "fas fa-heart";
  } else {
    fv_i_class = "far fa-heart";
  }
  return (
    <div className="col-md-4 col-sm-12 col-lg-3 py-2">
      <div className="card">
        <img className="card-img-top" src={image} alt={title} />
        <div className="card-body position-relative">
          <div className="title">
            <Link to={`/products/${product.id}`}>
              <span className="card-title">
                #{id} {title}
              </span>
            </Link>
          </div>
          <p className="card-text my-auto">{formatter(price)}</p>
          <div className="my-auto">
            <input
              type="number"
              className="form-control"
              placeholder="Miktar"
              onChange={(e) => setPiece(e.target.value)}
              value={piece}
            />
          </div>

          <p className="card-text my-auto">
            <button
              href="#"
              className="btn btn-outline-success btn-sm"
              onClick={handleClick}
            >
              Sepete Ekle
            </button>
          </p>
          <p className="card-text my-2">
            <i
              className={`${fv_i_class} favorite`}
              onClick={() => dispatch(ToggleFavoriteIcon(states, product))}
            ></i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
