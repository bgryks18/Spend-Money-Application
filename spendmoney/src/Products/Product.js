import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Product = (props) => {
  const states = useSelector((state) => state.SpendState);
  const history = useHistory();
  if (states.products.length < 1) {
    history.push("/");
    return <></>;
  } else if (
    !states.products.find((item) => item.id == props.match.params.id)
  ) {
    history.push("/");
    return <></>;
  } else {
    const product = states.products.find(
      (item) => item.id == props.match.params.id
    );
    const { id, title, price, description, category, image, rating } = product;
    return (
      <div className="container py-3 content">
        <div className="row main my-5 mx-auto">
          <div className="container">
            <div className="col-12 cart-item">
              <img className="float-left w-25 h-25" src={image} alt={title} />
              <div className="float-right w-75">
                <div className="card-body my-2 ">
                  <div className="container my-1 ">
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
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
