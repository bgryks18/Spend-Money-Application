import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RemoveCartItem, UpdateCartItemPiece } from "../actions/spendActions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartItem = ({
  id,
  productid,
  title,
  price,
  description,
  category,
  image,
  rating,
  piece,
  total,
}) => {
  const dispatch = useDispatch();
  const states = useSelector((state) => state.SpendState);
  const cartitem = {
    id,
    productid,
    title,
    price,
    description,
    category,
    image,
    rating,
    piece,
  };
  const [txtPiece, setTxtPiece] = useState(piece);

  useEffect(() => {
    if (cartitem.piece !== txtPiece) {
      dispatch(UpdateCartItemPiece({ ...cartitem, piece: parseInt(txtPiece) }));
    }
  }, [txtPiece]);
  const formatter = (x) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(x);

  return (
    <div className="col-12 cart-item">
      <div className="card">
        <div className="card-body my-2">
          <div className="float-right">
            <div className="input-group">
              <div className="input-group-prepend">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => dispatch(RemoveCartItem(cartitem))}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <input
                type="number"
                className="form-control"
                value={txtPiece}
                onChange={(e) =>
                  e.target.value >= 1 && setTxtPiece(e.target.value)
                }
              />
            </div>
          </div>
          <h5 className="card-title">
            <Link to={`/products/${productid}`}>{title}</Link>&nbsp;{piece}
            &nbsp;Adet
          </h5>

          <p className="card-text">
            <small>{description}</small>
          </p>
          <p className="card-text">
            Bu üründen {piece} adet eklendi. Toplam: {formatter(total)}
          </p>
          <p className="card-text">{formatter(price)}/1 Adet</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
