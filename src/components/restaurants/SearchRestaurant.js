import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchRestaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [token, _] = useState(localStorage.getItem("token"));

  async function search(key) {
    console.log(key);

    let result = await fetch("http://localhost:8000/api/v1/search/" + key);
    result = await result.json();
    console.log(result);
    setRestaurants(result);
  }
  return (
    <div>
      <div className="col-sm-6 offset-sm-3">
        <h1 className="my-4 text-center">Search Restaurant</h1>
        <input
          type="text"
          placeholder="Search Restaurant"
          onChange={(e) => search(e.target.value)}
          className="form-control my-3"
        />
      </div>
      <div className="col-sm d-flex align-items-center justify-content-center flex-wrap p-3 ">
        {restaurants.map((restaurant, index) => (
          <div
            className="card-body flex-fill mb-5 mx-4 mt-3 bg-light p-4 rounded"
            key={restaurant.id}
          >
            <div className="d-flex justify-content-between mt-3 text-align">
              <h4 className="card-title mx-3">{restaurant.title}</h4>
              <p className="card-title mx-3 fst-italic">{restaurant.address}</p>
            </div>
            <div className="d-flex justify-content-between"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchRestaurant;
