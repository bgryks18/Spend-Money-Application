import React from "react";
import { useSelector } from "react-redux";
import {} from "../actions/spendActions";
import FavoriteItem from "./FavoriteItem";

const Favorites = () => {
  const states = useSelector((state) => state.SpendState);
  if (states.favorites.length < 1) {
    return (
      <div className="container position-relative">
        <div className="row main my-5 mx-auto">Favoriler listeniz bomboş</div>
      </div>
    );
  }
  return (
    <div className="container content py-3">
      <div className="row main my-5 mx-auto">
        <div className="container">
          <h5>Favoriler</h5>
          {states.favorites.map((item) => {
            return <FavoriteItem {...item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
