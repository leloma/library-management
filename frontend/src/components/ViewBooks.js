import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { Link } from "react-router-dom";


const ViewBooks = () => {
  const url = "http://127.0.0.1:2001/api/booklist";
  const bookdetailurl = "http://127.0.0.1:2001/api/bookdetail";
  const [books, setBooks] = useState("");
  let { authToken, logoutUser } = useContext(AuthContext);
  console.log(authToken.access)
  var imageurl = ""
  var imagename = ""

  let api = useAxios()

  const getbooks = async() => {

      let response = await api.get('/api/booklist')
      if (response.status === 200){
        setBooks(response.data)
      }

  };

  const deletebook = (id, e) => {
    e.preventDefault();
    axios
      .delete(`${bookdetailurl}/${id}`)
      .then((response) => {console.log(response)
        setBooks(books.filter(book => book.id !== id));
      })
      .catch((error) => console.error(error));

    console.log("Book deleted");
  };

  const displaybooks = () => {
  
    if (books.length > 0) {

      return books.map((book) => {
        return (
          <div
            className="block max-w-sm mx-3 my-3 bg-white shadow-lg dark:bg-purple-500 float-left items-start"
            key={book.id}
          >
            {console.log(book.id, book.image)}
            {imageurl = book.image.split('/')}
            {imagename = imageurl.pop() || imageurl.pop()}

            <a href=" ">
              <img
                className="rounded-t-lg"
                src={`http://127.0.0.1:2001/api/media/myimages/${imagename}`}
                alt={imagename}
              />
            </a>
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {book.bookname}
              </h5>
              <h2 className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {book.author}
              </h2>

              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {book.description}
              </p>
              <Link to={`/updatebook/${book.id}`}>
              <button
                type="submit"
                className=" bg-blue-700 rounded-sm py-1 px-3 mt-2 mx-4 text-white hover:bg-blue-900"
                //   onClick={signUpButton}
              >
                Edit
              </button></Link>

              <button
                type="submit"
                className=" bg-red-700 rounded-sm py-1 px-3 mt-2 text-white hover:bg-red-900"
                onClick={(e) => deletebook(book.id, e)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    getbooks();
  }, []);
  return (
    <div>
      {displaybooks()}
    </div>
  );
};

export default ViewBooks;
