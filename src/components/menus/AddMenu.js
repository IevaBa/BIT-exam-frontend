import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddMenu(props) {
  const [title, setTitle] = useState("");
  const [restaurant_id, setRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  // Fetch restaurants
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/restaurants", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setRestaurants(result);
      });
  }, []);

  const addMenu = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("restaurant_id", restaurant_id);

    await axios
      .post(`http://localhost:8000/api/v1/menus`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/menus");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };
  return (
    <div>
      <h1 className="my-4 text-center">Add Menu</h1>
      <div className="col-sm-6 offset-sm-3">
        {Object.keys(validationError).length > 0 && (
          <div className="mb-0 alert alert-danger">
            {Object.entries(validationError).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        )}
        <form onSubmit={addMenu}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-3"
          />
          <select
            className="form-select my-3"
            onChange={(e) => setRestaurant(e.target.value)}
          >
            <option defaultValue disabled>
              Choose restaurant
            </option>
            {restaurants.map((restaurant, index) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.title}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-success">
            Add Menu
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMenu;
