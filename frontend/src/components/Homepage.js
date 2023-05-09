import { React, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Homepage = () => {
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(" ");
  const [description, setDescription] = useState("");
  const url = "http://127.0.0.1:2001/api/book";
  const navigate = useNavigate();
  let { user } = useContext(AuthContext);

  const addbookhandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("bookname", bookname);
    formdata.append("author", author);
    formdata.append("image", image, image.name);
    formdata.append("description", description);
    formdata.append("added_by", user.user_id);
    console.log(image.name);

    for (var [key, value] of formdata.entries()) {
      console.log(key, value);
    }
    try {
      // axios
      //   .post(url, {
      //     data: formdata,
      //     // headers: {
      //     //   'Content-Type': 'multipart/form-data'
      //     // },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     toast.success("Successfully registered");
      //     navigate("/");
      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       Object.keys(error.response.data).map((keyName, i) =>
      //         toast.error(JSON.stringify(error.response.data[keyName]))
      //       );
      //     } else if (error.request) {
      //       console.log(error.request);
      //     } else {
      //       console.log("Error", error.message);
      //     }
      //   });
      axios({
        method: "post",
        url: url,
        data: formdata,
        // headers: { "Content-Type": "multipart/form-data" },
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container grid place-items-center">
      {console.log(bookname, author, image, description)}

      <div className=" bg-purple-400  min-w-md  w-3/5 mt-10 px-16 py-4 ">
        <h3 className="text-black text-center text-3xl font-semibold mb-3">
          Add Book to Library
        </h3>
        <form className="" id="add-user-form" onSubmit={addbookhandler} >
          <div className=" grid grid-cols-2">
            <div className=" flex flex-col text-black text-lg mb-2">
              <label htmlFor="booknamee" className=" mb-2">
                Book Name
              </label>
              <label htmlFor="author" className=" mb-2">
                Author
              </label>
              <label htmlFor="image" className=" mb-2">
                Image
              </label>
              <label htmlFor="description" className=" mb-2">
                Description
              </label>
            </div>
            <div className=" flex flex-col text-black text-lg mb-2">
              <input
                type="text"
                name="bookname"
                placeholder="Book Name"
                className="mb-2 px-1"
                onChange={(e) => setBookName(e.target.value)}
                value={bookname}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                className="mb-2 px-1"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
              <input
                type="file"
                name="image"
                placeholder="image"
                className="mb-2 px-1"
                onChange={(e) => setImage(e.target.files[0])}
                // value={image}
              />
              <input
                type="description"
                name="confirm_description"
                placeholder="Description"
                className="mb-2 px-1"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <div className="grid place-content-center mb-3">
            <button
              type="submit"
              className=" bg-purple-700 rounded-full py-3 px-8 mt-2 text-white text-xl uppercase font-semibold hover:bg-purple-900"
              // onClick={signUpButton}
            >
              Add Book
            </button>
          </div>
          <p className=" text-center">
            View Your Books{" "}
            <Link to={"/viewbooks"} className="text-blue-700 underline font-bold">
              Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
