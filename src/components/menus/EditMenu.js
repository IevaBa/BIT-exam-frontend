import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditMenu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState({});
  const [restaurant_id, setRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch restaurants
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/restaurants")
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setRestaurants(result);
      });
  }, []);

  const fetchMenus = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/menus/${id}`)
      .then(({ data }) => {
        const { title, restaurant_id } = data;
        setTitle(title);
        setRestaurant(restaurant_id);
      });
  };

  const updateMenu = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title", title);
    formData.append("restaurant_id", restaurant_id);

    await axios
      .post(`http://localhost:8000/api/v1/menus/${id}`, formData)
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
            text: response.data.error,
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="my-4 text-center">Edit Menu</h1>
      <div className="col-sm-6 offset-sm-3">
        <form className="form-control px-5 py-4 shadow" onSubmit={updateMenu}>
          {Object.keys(validationError).length > 0 && (
            <div className="mb-0 alert alert-danger">
              {Object.entries(validationError).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <label className="" htmlFor="title">
              Edit title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="">Edit restaurant:</label>
            <select
              className="form-select my-2"
              value={restaurant_id}
              onChange={(e) => setRestaurant(e.target.value)}
            >
              {restaurants.map((restaurant, index) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-warning">
              Update Menu
            </button>
            <button
              className="btn btn-secondary mx-3"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
