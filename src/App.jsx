import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { IoIosCloseCircle } from "react-icons/io";
import { BiSend } from "react-icons/bi";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetail();
  }, []);

  const search = () => {
    const searchedProduct = details.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDetails(searchedProduct);
  };

  return (
    <div>
      <div className="just">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={search}>
          <BiSend className="icons" />
        </button>
      </div>

      <div className="images">
        {details.map((detail, id) => (
          <div key={id} className="detail">
            <img src={detail.image} alt="" />
            <h4>{detail.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
