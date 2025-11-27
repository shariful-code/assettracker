import { createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie } from "../../helpers/Cookie.js";

const initialState = {
  user: null,
  isLoggedIn: false,
  email: "", // for remember me
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, remember, email, token } = action.payload;

      // 1️⃣ Update Redux state
      state.user = user;
      state.isLoggedIn = true;
      state.email = remember ? email : "";

      // 2️⃣ Save token & user in cookies
      setCookie("token", token, "1d"); // token cookie
      setCookie("user", JSON.stringify(user), "1d"); // user cookie

      // 3️⃣ Remember email
      if (remember) {
        setCookie("email", email, "7d");
      } else {
        setCookie("email", "", "-1");
      }
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.email = "";

      // Clear cookies
      setCookie("token", "", "-1");
      setCookie("user", "", "-1");
      setCookie("email", "", "-1");
    },

    loadUserFromCookie: (state) => {
      const userCookie = getCookie("user");
      const emailCookie = getCookie("email");

      if (userCookie) {
        state.user = JSON.parse(userCookie);
        state.isLoggedIn = true;
      }

      if (emailCookie) {
        state.email = emailCookie;
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromCookie } = authSlice.actions;
export default authSlice.reducer;
