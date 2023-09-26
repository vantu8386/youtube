import React, { useState } from "react";
import "../css/loginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { showMessage } from "../helpers";
import axios from "axios";

export default function LoginPage() {
  const [login, setLogin] = useState({
    Email: "",
    Passwords: "",
  });

  const navigate = useNavigate();

  const { Email, Passwords } = login;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logintrationData = {
      Email,
      Passwords,
    };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!Email || !Passwords) {
      showMessage("error", "Vui lòng nhập đầy đủ thông tin");
      return;
    } else if (!emailPattern.test(Email)) {
      showMessage("error", "Email không đúng định dạng");
      return;
    } else if (Passwords.length < 8) {
      showMessage(
        "error",
        "Mật khẩu phải có ít nhất 8 kí tự, bao gồm ít nhất một chữ cái viết hoa và một chữ số"
      );
      return;
    } else if (!/[A-Z]/.test(Passwords)) {
      showMessage("error", "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa.");
      return;
    } else if (!/\d/.test(Passwords)) {
      showMessage("error", "Mật khẩu phải chứa ít nhất 1 chữ số.");
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/auth/signin", logintrationData)
      .then((res) => {
        console.log(res.data.result);
        if (res.data.result.status === "fasle email") {
          showMessage("error", "Email không tồn tại hoặc chưa đăng kí");
        } else if (res.data.result.status === "Thất bại") {
          showMessage("error", res.data.result.message);
        } else {
          showMessage("success", res.data.result.message);
          localStorage.setItem("UserName", res.data.result.Username)
          localStorage.setItem("UserID", res.data.result.UserID)
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src="../../../images/logo-cua-google.jpg" alt="" />
          <h2>Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Mật khẩu"
              name="Passwords"
              value={Passwords}
              onChange={handleChange}
            />
          </div>

          <button className="register-button">Đăng Nhập</button>
        </form>
        <div className="login-actions">
          <p className="login-link">
            Chưa có tài khoản? <Link to="/register">Đăng Kí</Link>
          </p>
          <div className="login-options">
            <Link to="#">Quên mật khẩu?</Link>
          </div>
        </div>
        <div className="login-divider">
          <hr /> Hoặc <hr />
        </div>
        <div className="login-social">
          <button className="google-button">
            <img
              src="https://img.icons8.com/fluent/48/000000/google-logo.png"
              alt="Google Logo"
            />
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
}
