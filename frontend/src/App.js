// import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ViewBooks from "./components/ViewBooks";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import UpdateBook from "./components/UpdateBook";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/viewbooks" element={<ViewBooks />} />
            <Route exact path="/updatebook/:id" element={<UpdateBook />} />

          </Route>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />

        </Routes>
      </AuthProvider>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
