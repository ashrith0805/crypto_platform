import Navbar from "./page/Navbar/Navbar";
import Home from "./page/Home/Home";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./page/Portfolio";
import Activity from "./page/Activity";
import Wallet from "./page/Wallet/Wallet";
import WithdrawalAdmin from "./page/WithdrawalAdmin";
import PaymentDetails from "./page/PaymentDetails";
import StockDetails from "./page/StockDetails";
import WatchList from "./page/Watchlist";
import Withdrawal from "./page/Withdrawal";
import Profile from "./page/Profile";
import Auth from "./page/Auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";
import axios from "axios";
import { useDispatch } from "react-redux";
function App() {
  // const { auth } = useSelector((store) => store);
  const auth = useSelector((state) => state.auth);
  // console.log("auth----", auth);
  const dispatch = useDispatch();

  /*
  above code only excutes when react DOM is first built within the main.jsx file
  App component will rerender whenever teh redux state changes
  BASICALLY IF ANY ACTION IS DISPATCHED WHICH CHANGES THE AUTH COMPONENT OF THE STATE TEN
  AUTH COMPONENT WILL RERENDER AND ABOVE CODE IS EXECUTED AGAIN
    const { auth } = useSelector((store) => store);
    use useSelecto hok to extract state from the redux store
    pass a selector component and this returns the portion of the state you are
    interested in.
    so auth will hold the auth component of the state
    extracts the auth reducer from within the store
  User effect hook in a component.
  In react the use effect hook is used to perform side effects
  the first argument contains the side effect code,the second argument is the
  array of dependancies. 

  fetch jwt from local storage
  use this as argument for getUser action, whcih on success triggers
  a get_user_success dispatch. This loads the users information and updated the state accordingly
  using the reducer
  */
  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);
  /*
  KEY IDEA HERE USEFFECT HOOK IS USED TO TRIGGER A GETUSER DISPATCH WHICH ON SUCCESS
  TRIGGERS A GET_USER_SUCCESS DISPATCH WHICH UPDATES THE AUTH STATE TO HOLD A USER OBJECT
  INITIALLY BEFORE LOG IN JWT IS NULL IN LOCAL STORAGE SO GETUSER WILL FAIL AND AUTH WILL NOT HOLD A USER OBJECT
  */

  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
