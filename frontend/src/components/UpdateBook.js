import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const bookid = useParams().id;
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [oldImage, setOldImage] = useState();
  const [newImage, setNewImage] = useState()
  // const [formData, setFormData] = useState({});
  const url = "http://127.0.0.1:2001/api/bookdetail";
  const navigate = useNavigate();

  const getbook = () => {
    axios
      .get(`${url}/${bookid}/`)
      .then((response) => {
        // setFormData(response.data);
        setBookName(response.data[0].bookname);
        setAuthor(response.data[0].author);
        setOldImage(response.data[0].image);
        setDescription(response.data[0].description);
      
      })
      .catch((error) => console.log(error));
  };

  const updatefunction = (bookid, e) => {
    const formdata = new FormData();
    formdata.append("bookname", bookname);
    formdata.append("author", author);
    if (newImage) {
      formdata.append("image", newImage, newImage.name);
    }
    formdata.append("description", description);

    e.preventDefault();
    // axios
    //   .patch(
    //     `${url}/${bookid}/`,
    //     JSON.stringify({
    //       bookname: bookname,
    //       author: author,
    //       description: description,
    //       // image:`image`
    //     }),
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
    //   navigate("/viewbooks")

    try {
      axios({
        method: "patch",
        url: `${url}/${bookid}/`,
        data: formdata,
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
    navigate("/viewbooks");

  };

  useEffect(() => {
    getbook();
  }, []);

  return (
    <div className="container grid place-items-center">
      <div className=" bg-purple-400  min-w-md  w-3/5 mt-10 px-16 py-4 ">
        <h3 className="text-black text-center text-3xl font-semibold mb-3">
          Update Book
        </h3>
        <form
          className=""
          id="add-user-form"
          onSubmit={(e) => {
            updatefunction(bookid, e);
          }}
        >
          <div className=" grid grid-cols-2">
            <div className=" flex flex-col text-black text-lg mb-2">
              <label htmlFor="bookname" className=" mb-2">
                Book Name
              </label>
              <label htmlFor="author" className=" mb-2">
                Author
              </label>
              <label htmlFor="description" className=" mb-2">
                Description
              </label>
              <label htmlFor="image" className=" mb-2">
                Image
              </label>
            </div>
            <div className=" flex flex-col text-black text-lg mb-2">
              <input
                type="text"
                name="bookname"
                className="mb-2 px-1"
                onChange={(e) => setBookName(e.target.value)}
                value={bookname}
              />
              {console.log(bookname, author, description, oldImage)}

              <input
                type="text"
                name="author"
                className="mb-2 px-1"
                accept="image/jpeg,image/png,image/gif"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
              <input
                type="description"
                name="confirm_description"
                className="mb-2 px-1"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <div className="flex flex-row">
                <input
                  type="file"
                  name="image"
                  placeholder="image"
                  className="mb-2 px-1"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
                <img
                  className="rounded-t-lg w-16 h-20"
                  src={`http://127.0.0.1:2001/api${oldImage}`}
                  alt={oldImage}
                />
              </div>
            </div>
          </div>
          <div className="grid place-content-center mb-3">
            <button
              type="submit"
              className=" bg-purple-700 rounded-full py-3 px-8 mt-2 text-white text-xl uppercase font-semibold hover:bg-purple-900"
            >
              Update Book
            </button>
          </div>

          <Link
            to={"/viewbooks"}
            className="text-center text-blue-700 underline font-bold"
          >
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
