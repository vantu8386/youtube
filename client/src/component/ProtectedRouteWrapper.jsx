// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { showMessage } from "../helpers";
// export default function ProtectedRouteWrapper() {
//   const storedUser = localStorage.getItem("UserName");

//   if (storedUser) {
//     return <Outlet />;
//   } else {
//     if (!storedUser) {
//       showMessage("error", "Không được phép, Vui lòng đăng nhập");
//       return <Navigate to="/login" />;
//     }
//   }
// }
