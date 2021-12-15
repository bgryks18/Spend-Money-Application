import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { PayCart } from "../actions/spendActions";
import CartItem from "./CartItem";

const Cart = () => {
  const states = useSelector((state) => state.SpendState);
  const dispatch = useDispatch();
  const history = useHistory();
  const formatter = (x) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(x);
  if (states.cart.length < 1) {
    return (
      <div className="container position-relative">
        <div className="row main my-5 mx-auto">Sepetiniz bomboş</div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container position-relative">
          <div className="row main my-5 mx-auto">
            <div className="container">
              <p className="ml-1">
                Bakiye: <b>{formatter(states.balance)}</b>
              </p>
            </div>
            {states.cart.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
            <div className="container my-1">
              <p className="card-text">
                Toplam tutar: {formatter(states.total)}
              </p>
              <p className="card-text">
                {states.balance > states.total ? (
                  <button
                    className="btn btn-outline-success"
                    onClick={() =>
                      dispatch(PayCart()).then(() => {
                        setTimeout(() => {
                          history.push("/");
                        }, 1000);
                      })
                    }
                  >
                    Öde
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    disabled
                    alt="Bakiyeniz yetersiz"
                  >
                    Öde
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Cart;
