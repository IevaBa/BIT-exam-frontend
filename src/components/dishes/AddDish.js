import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddDish(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [foto_url, setFoto] = useState("");
  const [menu_id, setMenu] = useState("");
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  // Fetch menus
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/menus", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setMenus(result);
      });
  }, []);

  const addDish = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("foto_url", foto_url);
    formData.append("menu_id", menu_id);

    await axios
      .post(`http://localhost:8000/api/v1/dishes`, formData, {
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
        navigate("/dishes");
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
      <h1 className="my-4 text-center">Add Dish</h1>
      <div className="col-sm-6 offset-sm-3">
        {Object.keys(validationError).length > 0 && (
          <div className="mb-0 alert alert-danger">
            {Object.entries(validationError).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        )}
        <form onSubmit={addDish}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="text"
            placeholder="Image url"
            onChange={(e) => setFoto(e.target.value)}
            className="form-control my-3"
          />
          <select
            className="form-select my-3"
            onChange={(e) => setMenu(e.target.value)}
          >
            <option defaultValue disabled>
              Choose menu
            </option>
            {menus.map((menus, index) => (
              <option key={menus.id} value={menus.id}>
                {menus.title}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-success">
            Add Dish
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

export default AddDish;
