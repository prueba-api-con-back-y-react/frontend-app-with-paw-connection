import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "html-to-excel-react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "https://pruebamysql.pythonanywhere.com/persons/"
    );
    setUsers(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">

        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        <hr></hr>
        <table className="table border shadow" id="table-to-xls">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  <a href={`/viewuser/${user.id}`}>{index + 1}</a>
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
