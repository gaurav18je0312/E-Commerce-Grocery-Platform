import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const { data } = useContext(AuthContext);
  const user = data.user;
  const isLoading = data.isloading;

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        user["is_admin"] ? (
          children
        ) : (
          <div className="m-2 p-2 alert alert-danger">Not Authorized</div>
        )
      ) : (
        <Navigate to="/login/" />
      )}
    </>
  );
};

export default AdminRoute;
