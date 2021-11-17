export const initialState = {
  isUserLoggedIn: false,
  isUserRegistered: false,
  user: null,
  batch: {},
  authToken: "",
};

// export const getBasketTotal = (basket) => {
//   let total = 0;
//   basket.map((item) => {
//     total = total + item.productPrice;
//   });
//   return Math.round(total * 100) / 100;
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.user,
        batch: action.batch,
        isUserRegistered: action.isUserRegistered,
        authToken: action.authToken,
      };
    }
    default:
      return state;
  }
};

export default reducer;
