import ax from "axios";
import { v4 as uuidv4 } from "uuid";
const Url = "https://fakestoreapi.com/";
const max = 100;
const setLoading = () => {
  return {
    type: "SET_LOADING",
  };
};
export const GetProductsFromApi = (data) => {
  return {
    type: "GET_PRODUCTS",
    payload: data,
  };
};
export const ThrowError = (error) => {
  return {
    type: "ERROR",
    payload: error,
  };
};
export const GetData = () => {
  setLoading();
  return async (dispatch) => {
    await ax
      .get(`${Url}/products`)
      .then((res) => {
        dispatch(GetProductsFromApi(res.data));
      })
      .catch((error) => {
        dispatch(ThrowError(error));
      });
  };
};
/* */
const AddFeedbackToState = (msg) => {
  return {
    type: "ADD_FEEDBACK",
    payload: msg,
  };
};
const ClearFeedbacksInState = () => {
  return {
    type: "CLEAR_FEEDBACKS",
  };
};
export const AddNewFeedBack = ({ title, description, piece, alert = null }) => {
  piece = parseInt(piece);
  return async (dispatch) => {
    await dispatch(ClearFeedbacksInState());
    setTimeout(() => {
      dispatch(AddFeedbackToState({ title, description, piece, alert }));
    }, 100);
  };
};
export const ClearFeedbacks = () => {
  return async (dispatch) => {
    await dispatch(ClearFeedbacksInState());
  };
};
/* */

const AddToCartInState = (cartitem) => {
  return {
    type: "ADD_TO_CART",
    payload: cartitem,
  };
};
export const AddToCart = ({
  id,
  productid = id,
  title,
  price,
  description,
  category,
  image,
  rating,
  piece,
  total = 0,
}) => {
  piece = parseInt(piece);
  if (piece > max) {
    return async (dispatch) => {
      dispatch(
        AddNewFeedBack({
          description: `Bir seferde en fazla ${max} ürün ekleyebilirsiniz.`,
          alert: true,
        })
      );
    };
  } else if (piece < 1) {
    return async (dispatch) => {
      dispatch(
        AddNewFeedBack({
          description: `Ürün miktarı pozitif tamsayı olmalıdır..`,
          alert: true,
        })
      );
    };
  } else {
    return async (dispatch) => {
      await dispatch(
        AddToCartInState({
          id: uuidv4(),
          productid,
          title,
          price,
          description,
          category,
          image,
          rating,
          piece,
          total,
        })
      );
      await dispatch(Calculate());
      await dispatch(
        AddNewFeedBack({
          title: title,
          description: `ürünü sepete eklendi.`,
          piece: piece,
        })
      );
    };
  }
};
/* */
const Calculate = () => {
  return {
    type: "CALCULATE_TOTAL",
  };
};
const PayCartInState = () => {
  return {
    type: "PAY",
  };
};
export const PayCart = () => {
  return async (dispatch) => {
    await dispatch(ClearFeedbacksInState());
    await dispatch(PayCartInState());
    await dispatch(
      AddNewFeedBack({
        title: null,
        description: "Satın alındı",
        piece: null,
        alert: true,
      })
    );
  };
};
/* */
const UpdateCartItemPieceInState = (cartitem) => {
  return {
    type: "UPDATE_CART_ITEM_PIECE",
    payload: cartitem,
  };
};
export const UpdateCartItemPiece = (cartitem) => {
  return async (dispatch) => {
    await dispatch(UpdateCartItemPieceInState(cartitem));
    await dispatch(Calculate());
    await dispatch(
      AddNewFeedBack({
        alert: true,
        description: `Adet ${cartitem.piece} olarak değiştirildi.`,
      })
    );
  };
};
/* */
const RemoveCartItemInState = (cartitem) => {
  return {
    type: "REMOVE_CART_ITEM",
    payload: cartitem,
  };
};
export const RemoveCartItem = (cartitem) => {
  return async (dispatch) => {
    await dispatch(RemoveCartItemInState(cartitem));
    await dispatch(Calculate());
    await dispatch(
      AddNewFeedBack({ alert: true, description: "Ürün kaldırıldı" })
    );
  };
};
/* */
const AddFavoriteInState = (product) => {
  return {
    type: "ADD_FAVORITE",
    payload: product,
  };
};
export const AddFavorite = (product) => {
  return async (dispatch) => {
    await dispatch(AddFavoriteInState(product));
    await dispatch(
      AddNewFeedBack({
        alert: true,
        description: `${product.title} ürünü favorilere eklendi.`,
      })
    );
  };
};
const RemoveFavoriteInState = (product) => {
  return {
    type: "REMOVE_FAVORITE",
    payload: product,
  };
};
export const RemoveFavorite = (product) => {
  return async (dispatch) => {
    await dispatch(RemoveFavoriteInState(product));
    await dispatch(
      AddNewFeedBack({
        alert: true,
        description: `${product.title} ürünü favorilerden kaldırıldı.`,
      })
    );
  };
};

export const ToggleFavoriteIcon = (states, product) => {
  if (states.favorites.find((item) => item.id === product.id)) {
    return async (dispatch) => {
      await dispatch(RemoveFavorite(product));
    };
  } else {
    return async (dispatch) => {
      await dispatch(AddFavorite(product));
    };
  }
};
