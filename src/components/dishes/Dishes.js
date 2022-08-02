import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Dishes(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  // LIST DISHES
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/dishes")
      .then((res) => res.json())
      .then(
        (result) => {
          //  console.log(result);
          setDishes(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  // DELETE
  const fetchDishes = async () => {
    await axios.get(`http://localhost:8000/api/v1/dishes`).then(({ data }) => {
      setDishes(data);
    });
  };
  const deleteDish = async (id) => {
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
      .delete(`http://localhost:8000/api/v1/dishes/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchDishes();
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
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Menu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <tr key={dish.id}>
                  <td>{dish.title}</td>
                  <td>{dish.description}</td>
                  <td>
                    <img
                      style={{ width: "200px", height: "150px" }}
                      className="rounded mx-auto d-block"
                      src={dish.foto_url}
                      alt="dish_foto"
                    ></img>
                  </td>
                  <td>{dish.menu.title}</td>
                  <td>
                    <div className="text-center">
                      <Link to={"/dishes/edit/" + dish.id}>
                        <button className="btn btn-primary">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger mt-2 mx-2"
                        onClick={() => deleteDish(dish.id)}
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
            onClick={() => navigate("/dishes/add")}
          >
            Add Dish
          </button>
        </div>
      </div>
    );
  }
}

export default Dishes;
