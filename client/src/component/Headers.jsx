import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Headers() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const username = localStorage.getItem("UserName");
  const handleLogout = () => {
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserID");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/api/v1/search/?search=${search}`)
      .then((res) => {
        console.log(res.data);
        navigate({
          pathname: "/search",
          search: `term=${search}`
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="top_nav text-center">
        <div className="top_title row">
          <div className="logo_title col">
            <i className="fa-solid fa-bars"></i>
            <Link to={"/"}>
              <img
                className="logo_img"
                src="../../../images/logo-ytb.png"
                alt=""
              />
            </Link>
          </div>
          <div className="search_title col justify-content-between">
            <form onSubmit={handleSubmit} className="flex-grow-1">
              <input
                className="search_ytb"
                type="search"
                name="search"
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn_search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <i
              className="fa-solid fa-microphone"
              data-title="Tìm kiếm bằng giọng nói"
            ></i>
          </div>

          <div className="btn_avatar_tile col">
            <button className="btn_upload">
              <Link to={"/channel"} style={{ color: "black" }}>
                <i className="fa-solid fa-video fa-shake avatar"></i>
              </Link>
            </button>
            <button className="btn_upload">
              <i className="fa-regular fa-bell fa-shake avatar"></i>
            </button>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle btn_upload"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img className="avatar" src="../../../images/user.png" alt="" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {username ? (
                  <>
                    <li>
                      <Link className="dropdown-item">
                        <b>@{username}</b>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/register"} className="dropdown-item">
                        Đăng kí
                      </Link>
                    </li>
                    <li>
                      <Link to={"/login"} className="dropdown-item">
                        Đăng nhập
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
