import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import router from "next/router";
import useSWR from "swr";
import styles from "@/styles/Admin.module.scss";
import { campuses, halls } from "@/components/Forms/InstitutionalInfo";
import { useEffect, useRef, useState } from "react";
import { TUser } from "./api/users";
import { slugify } from "@/utils/slugify";

const Admin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<Record<string, (string | number)[]>>(
    {}
  );

  const { data, error, mutate } = useSWR<{ users: TUser[]; hasMore: boolean }>(
    [`/api/users?keyword=${keyword}&filters=${JSON.stringify(filters)}`, "GET"],
    makeSecuredRequest
  );

  const users = data?.users;
  const hasMore = data?.hasMore;

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push("/");
    }
  }, [user]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { id, value, checked } = event.target;
    const copiedFilters: Record<string, (string | number)[]> = Object.keys(
      filters
    ).length
      ? { level: [], campus: [], payment: [], ...filters }
      : {
          level: [],
          campus: [],
          payment: []
        };

    Object.keys(copiedFilters).forEach(key => {
      const field = copiedFilters[key];

      if (id.includes(key)) {
        checked ? field.push(value) : field.splice(field.indexOf(value), 1);
      }
    });

    console.log(value, copiedFilters);

    const newEntries = Object.entries(copiedFilters)
      .map(([key, value]) => {
        if (!value.length) {
          return undefined;
        }

        return [key, value];
      })
      .filter(Boolean) as [string, string[]][];

    console.log(newEntries);

    const newFilters = Object.fromEntries(newEntries);
    setFilters(newFilters);
  };

  return (
    <main className={styles.main}>
      <h1>Students</h1>
      <div id="search" className={styles.search}>
        <input
          type="search"
          name="search"
          id="search-input"
          aria-label="search"
          placeholder="search"
          onChange={handleSearchInput}
        />
      </div>
      <section
        id="filters"
        className={styles.filters}
        aria-labelledby="filter-by"
      >
        <h2 id="filter-by">Filter By</h2>
        <form onChange={handleCheckboxChange}>
          <ul id="filter-by-field" className={styles.fields}>
            <li id="level">
              <p>Level</p>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    name="first-year"
                    value={100}
                    id="level-1"
                  />
                  <label htmlFor="level-1">100</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="second-year"
                    value={200}
                    id="level-2"
                  />
                  <label htmlFor="level-2">200</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="third-year"
                    value={300}
                    id="level-3"
                  />
                  <label htmlFor="level-3">300</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="fourth-year"
                    value={400}
                    id="level-4"
                  />
                  <label htmlFor="level-4">400</label>
                </li>
              </ul>
            </li>
            <li id="campus">
              <p>Campus</p>
              <ul>
                {campuses.map(campus => (
                  <li key={campus}>
                    <input
                      type="checkbox"
                      name={slugify(campus)}
                      value={campus}
                      id={`${slugify(campus)}-campus`}
                    />
                    <label htmlFor={`${slugify(campus)}-campus`}>
                      {campus}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
            <li id="payment-status">
              <p>Payment status</p>
              <ul>
                <li>
                  <input
                    id="payment-paid"
                    name="paid"
                    type="checkbox"
                    value={1}
                  />
                  <label htmlFor="payment-paid">Paid</label>
                </li>
                <li>
                  <input
                    id="payment-paid-not-paid"
                    name="not-paid"
                    type="checkbox"
                    value={0}
                  />
                  <label htmlFor="payment-paid-not-paid">Not Paid</label>
                </li>
              </ul>
            </li>
          </ul>
        </form>
      </section>
      <table className={styles.table}>
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
