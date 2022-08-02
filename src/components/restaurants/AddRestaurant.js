import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddRestaurant() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const AddRestaurant = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("address", address);

    await axios
      .post(`http://localhost:8000/api/v1/restaurants`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/restaurants");
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
      <h1 className="my-4 text-center">Add Restaurant</h1>
      <div className="col-sm-6 offset-sm-3">
        {Object.keys(validationError).length > 0 && (
          <div className="mb-0 alert alert-danger">
            {Object.entries(validationError).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        )}
        <form onSubmit={AddRestaurant}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            className="form-control my-3"
          />
          <button type="submit" className="btn btn-success">
            Add Restaurant
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
export default AddRestaurant;
