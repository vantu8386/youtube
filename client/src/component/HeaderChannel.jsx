import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderChannel() {
  const navigate = useNavigate();
  const username = localStorage.getItem("UserName");
  const handleLogout = () => {
    localStorage.removeItem("UserName");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div>
      <nav className="top_nav_channel text-center">
        <div className="top_title row">
          <div className="logo_title col">
            <i className="fa-solid fa-bars"></i>
            <Link to={"/"}>
              <img
                className="logo_studio"
                src="../../../images/YouTube_Studio.png"
                alt=""
              />
            </Link>
          </div>
          <div className="search_title col ">
            <input
              className="search_ytb"
              type="search"
              placeholder="Tìm kiếm kênh của bạn"
            />
            <button className="btn_search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="btn_avatar_tile col">
            <Link to={"/upload"}>
              <button className="btn_upload">
                <i className="fa-solid fa-video fa-shake avatar"></i>
              </button>
            </Link>

            {/* <button className="btn_upload">
              <img className="avatar" src="../../../images/user.png" alt="" />
            </button> */}
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
    </div>
  );
}
