import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <h1 className=" text-3xl uppercase font-bold py-3">
        Diontrails La Beau Library
      </h1>
      {user && (
        <div>
          <p>Hello {user.fullname}</p>
          
            <p className=" text-red-600 font-bold hover:cursor-pointer" onClick={logoutUser}>
              Logout
            </p>
        </div>
      )}
    </div>
  );
};

export default Header;
