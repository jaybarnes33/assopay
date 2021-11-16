import useUser from "@/hooks/useUser";
import { IUserSchema } from "@/models/User";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import router from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { TUser } from "./api/users";

const Admin = () => {
  const { user } = useUser();
  const {
    data: users,
    error,
    mutate
  } = useSWR<TUser[]>(["/api/users", "GET"], makeSecuredRequest);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push("/");
    }
  }, [user]);

  console.log(users);

  return (
    <main>
      <div>
        <h2>Students</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Level</th>
            <th>Campus</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.level}</td>
              <td>{user.campus}</td>
              <td>✔</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </main>
  );
};

export default Admin;
