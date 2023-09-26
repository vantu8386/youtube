import "../css/registerPage.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showMessage } from "../helpers";
import axios from "axios";

export default function RegisterPage() {
  const [register, setRegister] = useState({
    Username: "",
    Email: "",
    Passwords: "",
    RepeatPassword: "",
  });

  const navigate = useNavigate();
  const { Username, Email, Passwords, RepeatPassword } = register;

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationData = {
      Username,
      Email,
      Passwords,
    };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!Username || !Email || !Passwords || !RepeatPassword) {
      showMessage("error", "Vui lòng nhập đầy đủ thông tin");
      return;
    } else if (
      Username.length < 5 ||
      Username[0] !== Username[0].toUpperCase()
    ) {
      showMessage(
        "error",
        "Username phải có ít nhất 5 kí tự và bắt đầu bằng chữ cái viết hoa"
      );
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
    } else if (Passwords !== RepeatPassword) {
      showMessage("error", "Mật khẩu và Xác nhận mật khẩu không khớp nhau");
      return;
    }

    axios
      .post("http://localhost:3000/api/v1/auth/signup", registrationData)
      .then((res) => {
        console.log(res);
        showMessage("success", "Đăng kí thành công");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.error.errno === 1062);
        if (err.response.data.error.errno === 1062) {
          showMessage("error", "Email đã được người khác đăng kí");
        }
      });
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <img
          style={{ width: "200px" }}
          src="../../../images/logo-cua-google.jpg"
          alt=""
        />
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Biệt danh của bạn"
              name="Username"
              value={Username}
              onChange={handleChange}
            />
          </div>
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
          <div className="input-group">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              name="RepeatPassword"
              value={RepeatPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="register-button">
            Đăng Ký
          </button>
        </form>
        <p className="terms">
          Bằng cách đăng ký, bạn đồng ý với Điều khoản và Chính sách Quyền riêng
          tư của chúng tôi.
        </p>
        <p className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
