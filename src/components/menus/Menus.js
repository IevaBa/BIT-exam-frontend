import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Menus(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();
  const [token, _] = useState(localStorage.getItem("token"));
  // LIST MENUS
  useEffect(() => {
    if (!token) return navigate("/login");
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    fetch("http://localhost:8000/api/v1/menus", { headers: h })
      .then((res) => {
        if (!res.ok) {
          // 401
          setError(res);
          setIsLoaded(true);
          //console.log(token);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          //  console.log(result);
          setMenus(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  // DELETE
  const fetchMenus = async () => {
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    await axios
      .get(`http://localhost:8000/api/v1/menus`, {
        headers: h,
        credentials: "include",
      })
      .then(({ data }) => {
        setMenus(data);
      });
  };
  const deleteMenu = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/v1/menus/${id}`, {
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
        fetchMenus();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.error,
          icon: "error",
        });
      });
  };

  if (!isLoaded) {
    return <div className="text-center fs-4 m-4">Loading...</div>;
  } else if (error) {
    return (
      <div className="text-center fs-4 m-4 text-danger">
        Error: {error.message}
      </div>
    );
  } else {
    return (
      <div>
        <div className="container d-flex flex-column align-items-center justify-content-center shadow px-3 py-3 bg-body rounded my-5">
          <table className="table table-bordered table-striped mt-2 align-middle">
            <thead>
              <tr>
                <th>Menu title</th>
                <th>Restaurant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td>{menu.title}</td>
                  <td>{menu.restaurant.title}</td>
                  <td>
                    <div className="text-center">
                      <Link to={"/menus/edit/" + menu.id}>
                        <button className="btn btn-primary">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => deleteMenu(menu.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-success"
            onClick={() => navigate("/menus/add")}
          >
            Add Menu
          </button>
        </div>
      </div>
    );
  }
}

export default Menus;
