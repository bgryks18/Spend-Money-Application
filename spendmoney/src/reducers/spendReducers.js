const initalState = {
  products: [],
  loading: true,
  balance: 128 * 1000000000,
  cart: [],
  feedbacks: [],
  favorites: [],
  total: 0,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case "ADD_FEEDBACK":
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload],
      };
    case "CLEAR_FEEDBACKS":
      return {
        ...state,
        feedbacks: [],
      };
    case "ADD_TO_CART":
      if (
        state.cart.find((item) => item.productid === action.payload.productid)
      ) {
        const cartitem = state.cart.find(
          (item) => item.productid === action.payload.productid
        );
        const cartindex = state.cart.findIndex(
          (item) => item.productid === action.payload.productid
        );
        const piece = cartitem.piece + action.payload.piece;
        state.cart[cartindex] = {
          ...action.payload,
          piece,
          total: piece * action.payload.price,
          id: cartitem.id,
        };
        return {
          ...state,
          loading: false,
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              total: action.payload.piece * action.payload.price,
            },
          ],
          loading: false,
        };
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "PAY":
      if (state.balance > state.total) {
        return {
          ...state,
          loading: false,
          cart: [],
          balance: state.balance - state.total,
          total: 0,
          feedbacks: [],
        };
      } else {
        return state;
      }
    case "UPDATE_CART_ITEM_PIECE":
      const cartitemindex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cart[cartitemindex] = {
        ...action.payload,
        total: action.payload.price * action.payload.piece,
      };
      return {
        ...state,
        loading: false,
      };
    case "REMOVE_CART_ITEM":
      const arr = state.cart.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cart: arr,
      };
    case "CALCULATE_TOTAL":
      let x = 0;
      state.cart.forEach((item) => {
        x += item.total;
      });
      return {
        ...state,
        total: x,
      };
    case "ADD_FAVORITE":
      if (!state.favorites.find((item) => item.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      } else {
        return state;
      }

    case "REMOVE_FAVORITE":
      if (state.favorites.find((item) => item.id === action.payload.id)) {
        const arr = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          favorites: arr,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
