import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetData } from "../actions/spendActions";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const states = useSelector((state) => state.SpendState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetData());
  }, []);
  if (states.loading) {
    return (
      <div className="fixed-bottom" style={{ left: "45%", top: "30%" }}>
        Yükleniyor....
      </div>
    );
  } else {
    const products = states.products;
    return (
      <>
        <div className="container position-relative">
          <div className="row main my-5 mx-auto">
            {products.map((item) => {
              return <ProductItem key={item.id} {...item} />;
            })}
          </div>
        </div>
      </>
    );
  }
};

export default ProductList;
