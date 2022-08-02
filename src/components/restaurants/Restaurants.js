import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Restaurants(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [token, _] = useState(localStorage.getItem("token"));

  // LIST RESTAURANTS
  useEffect(() => {
    if (!token) return navigate("/login");
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    fetch("http://localhost:8000/api/v1/restaurants", { headers: h })
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
          //console.log(result);
          setRestaurants(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  // DELETE
  const fetchRestaurants = async () => {
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    await axios
      .get(`http://localhost:8000/api/v1/restaurants`, {
        headers: h,
        credentials: "include",
      })
      .then(({ data }) => {
        setRestaurants(data);
      });
  };
  const deleteRestaurant = async (id) => {
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
      .delete(`http://localhost:8000/api/v1/restaurants/${id}`, {
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
        fetchRestaurants();
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
                <th>Code</th>
                <th>Title</th>
                <th>Address</th>
                <th>Menu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.id}</td>
                  <td>{restaurant.title}</td>
                  <td>{restaurant.address}</td>
                  <td>
                    <div className="text-center">
                      <Link to={"/menus/"}>
                        <button className="btn btn-secondary">View Menu</button>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <Link
                        // style={
                        //   JSON.parse(localStorage.getItem("admin")) === 1
                        //     ? { display: "inline" }
                        //     : { display: "none" }
                        // }
                        to={"/restaurants/edit/" + restaurant.id}
                      >
                        <button className="btn btn-primary">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger mx-3 mt-2"
                        onClick={() => deleteRestaurant(restaurant.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div>
              <button
                className="btn btn-success"
                onClick={() => navigate("/restaurants/add")}
              >
                Add Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurants;
