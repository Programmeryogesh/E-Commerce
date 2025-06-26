import "./App.css";
import HomePage from "./components/homePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NavigationBar from "./components/navbar";
import ExploreComponent from "./components/exploreComponent";
import { store } from "./store/reducers/store";
import { Provider } from "react-redux";
import LoginPage from "./components/loginPage";
import CartComponent from "./components/CartComponent";
import SignUp from "./components/signUpPage";
import MyAccount from "./components/MyAccount";
import ProductUpload from "./components/productUpload";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";
import ProductTableData from "./components/productTableData";
import ProceedToCheckout from "./components/ProceedToCheckout";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/MyAccount" , "/ResetPassword"]; // Add routes where navbar should be hidden

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <NavigationBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:productId" element={<ExploreComponent />} />
        <Route path="/Cart" element={<CartComponent />} />
        <Route path="/login/SignUp" element={<SignUp />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/upload_product" element={<ProductUpload />} />
        <Route path="/upload_product/:productId" element={<ProductUpload />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/table" element={< ProductTableData/>} />
        <Route path="/proceedToCheckout" element={< ProceedToCheckout/>} />

      </Routes>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
