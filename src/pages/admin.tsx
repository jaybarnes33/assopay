import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import router from "next/router";
import useSWR from "swr";
import { campuses, halls } from "@/components/Forms/InstitutionalInfo";
import { useEffect } from "react";
import { TUser } from "./api/users";
import { slugify } from "@/utils/slugify";

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
      <h1>Students</h1>
      <div id="search">
        <input
          type="search"
          name="search"
          id="search-input"
          aria-label="search"
          placeholder="search"
        />
      </div>
      <section id="filters" aria-labelledby="filter-by">
        <h2 id="filter-by">Filter By</h2>
        <ul>
          <li id="level">
            <p>Level</p>
            <ul>
              <li>
                <label htmlFor="first-year">100</label>
                <input type="checkbox" name="first-year" id="first-year" />
              </li>
              <li>
                <label htmlFor="second-year">200</label>
                <input type="checkbox" name="second-year" id="second-year" />
              </li>
              <li>
                <label htmlFor="third-year">300</label>
                <input type="checkbox" name="third-year" id="third-year" />
              </li>
              <li>
                <label htmlFor="fourth-year">400</label>
                <input type="checkbox" name="fourth-year" id="fourth-year" />
              </li>
            </ul>
          </li>
          <li id="hall">
            <p>Hall</p>
            <ul>
              {halls.map(hall => (
                <li key={hall}>
                  <label htmlFor={slugify(hall)}>{hall}</label>
                  <input
                    type="checkbox"
                    name={slugify(hall)}
                    id={slugify(hall)}
                  />
                </li>
              ))}
            </ul>
          </li>
          <li id="campus">
            <p>Campus</p>
            <ul>
              {campuses.map(campus => (
                <li key={campus}>
                  <label htmlFor={slugify(campus)}>{campus}</label>
                  <input
                    type="checkbox"
                    name={slugify(campus)}
                    id={slugify(campus)}
                  />
                </li>
              ))}
            </ul>
          </li>
          <li id="payment-status">
            <p>Payment status</p>
            <ul>
              <li>
                <label htmlFor="paid">Paid</label>
                <input id="paid" name="paid" type="checkbox" />
              </li>
              <li>
                <label htmlFor="not-paid">Not Paid</label>
                <input id="not-paid" name="not-paid" type="checkbox" />
              </li>
            </ul>
          </li>
        </ul>
      </section>
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
              <td>{user.paid ? "✔" : "❌"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </main>
  );
};

export default Admin;
