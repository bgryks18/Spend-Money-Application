import React from "react";

const FavoriteItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  return (
    <div className="col-12 cart-item">
      <img className="float-left w-25 h-25" src={image} alt={title} />
      <div className="float-right w-75">
        <div className="card-body my-2 ">
          <div className="container my-1">
            <p>
              <b>
                #{id} {title}
              </b>
            </p>
            <p>
              <small>{description}</small>
            </p>
            <p>
              <small>{category}</small>
            </p>
          </div>
        </div>
      </div>
      <div className="clear"></div>
      <hr />
    </div>
  );
};

export default FavoriteItem;
