import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegisterUser = ( {url, fullname, email, password} ) => {


  let navigate = useNavigate();


    try {
      axios
        .post(url, {
          fullname: fullname,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Successfully registered");
          navigate("/");
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            // for(error in error.response.data){
            //   toast.error(JSON.stringify(error.response.data));
            // }

            Object.keys(error.response.data).map((keyName, i) =>
              // <li className="travelcompany-input" key={i}>
              //     <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
              // </li>
              toast.error(JSON.stringify(error.response.data[keyName]))
            );
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };



export default RegisterUser;
