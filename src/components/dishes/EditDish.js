import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditDish() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState({});
  const [description, setDescription] = useState({});
  const [foto_url, setFoto] = useState({});
  const [menu_id, setMenu] = useState("");
  const [menus, setMenus] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchDishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch menus
  useEffect(() => {
    if (!token) return navigate("/login");
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

  const fetchDishes = async () => {
    await axios
      .get(`http://localhost:8000/api/v1/dishes/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const { title, description, foto_url, menu_id } = data;
        setTitle(title);
        setDescription(description);
        setFoto(foto_url);
        setMenu(menu_id);
      });
  };

  const updateDish = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("foto_url", foto_url);
    formData.append("menu_id", menu_id);

    await axios
      .post(`http://localhost:8000/api/v1/dishes/${id}`, formData, {
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
            text: response.data.error,
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="my-4 text-center">Edit Dish</h1>
      <div className="col-sm-6 offset-sm-3">
        <form className="form-control px-5 py-4 shadow" onSubmit={updateDish}>
          {Object.keys(validationError).length > 0 && (
            <div className="mb-0 alert alert-danger">
              {Object.entries(validationError).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <label className="" htmlFor="title">
              Edit name:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="price">
              Edit description:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="price">
              Edit image url:
            </label>
            <input
              type="text"
              value={foto_url}
              onChange={(e) => setFoto(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="">Edit menu:</label>
            <select
              className="form-select my-2"
              value={menu_id}
              onChange={(e) => setMenu(e.target.value)}
            >
              {menus.map((menu, index) => (
                <option key={menu.id} value={menu.id}>
                  {menu.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-warning">
              Update Dish
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
