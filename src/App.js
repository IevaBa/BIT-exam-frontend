import Header from "./components/header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import error from "./404error.png";
import Dishes from "./components/dishes/Dishes";
import Restaurants from "./components/restaurants/Restaurants";
import AddDish from "./components/dishes/AddDish";
import AddRestaurant from "./components/restaurants/AddRestaurant";
import Menus from "./components/menus/Menus";
import AddMenu from "./components/menus/AddMenu";
import EditRestaurant from "./components/restaurants/EditRestaurant";
import EditMenu from "./components/menus/EditMenu";
import EditDish from "./components/dishes/EditDish";
import SearchRestaurant from "./components/restaurants/SearchRestaurant";
import { useEffect, useState } from "react";

function App() {
  const [logedIn, setLogedIn] = useState(false);
  const [token, _] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  useEffect(() => {
    if (token) {
      setLogedIn(true);
      setUser(localStorage.getItem("username"));
      console.log("setted");
      console.log(user);
    }
    admin === false ? setAdmin(false) : setAdmin(true);
  }, [token]);
  return (
    <BrowserRouter>
      <Header
        logedIn={logedIn}
        setLogedIn={setLogedIn}
        token={token}
        user={user}
        admin={admin}
        setAdmin={setAdmin}
      />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/add" element={<AddRestaurant />} />
        <Route path="/restaurants/edit/:id" element={<EditRestaurant />} />
        <Route path="/search" element={<SearchRestaurant />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/menus/add" element={<AddMenu />} />
        <Route path="/menus/edit/:id" element={<EditMenu />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/dishes/add" element={<AddDish />} />
        <Route path="/dishes/edit/:id" element={<EditDish />} />
        <Route
          path="/login"
          element={
            <Login
              logedIn={logedIn}
              setLogedIn={setLogedIn}
              token={token}
              user={user}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <main className="404-error container-fluid">
              <img
                className="img-fluid rounded mx-auto d-block"
                src={error}
                alt="404 error"
              />
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
