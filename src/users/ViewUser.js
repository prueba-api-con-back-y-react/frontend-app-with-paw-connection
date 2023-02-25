import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    last_name: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`https://pruebamysql.pythonanywhere.com/persons/${id}`);
    setUser(result.data);
  };

  let navigate = useNavigate();

  const deleteUser = async (id) => {
    await axios.delete(`https://pruebamysql.pythonanywhere.com/persons/${id}`);
    navigate("/");
  };

  const showAlert = async () => {
    swal({
      title: "Mensaje de confirmación",
      text: "Te confirmamos que el usuario se ha borrado correctamente",
      icon: "success",
      button: "Aceptar",
      timer: "2000",
    });
  };

  const showAlert2 = async () => {
    swal({
      title: "Eliminar usuario",
      text: "Estás seguro que desea eliminar el usuario?",
      icon: "warning",
      buttons: ["No", "Sí"],
    }).then((res) => {
      if (res) {
        deleteUser(user.id);
        showAlert();
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <b>Last Name: </b>
                  {user.last_name}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
          <Link
            className="btn btn-outline-primary mx-2"
            to={`/edituser/${user.id}`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              showAlert2();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}