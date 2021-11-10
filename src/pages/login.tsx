import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Button from "../components/core/Button";
import router from "next/router";
const login = () => {
  const [show, setShow] = useState(false);

  const submitHandler = () => {};
  return (
    <div className={styles.main}>
      <Button
        className="btn-main btn-sm absolute-left"
        onClick={() => router.back()}
      >
        Go back
      </Button>
      <div className={styles.form_container}>
        <div className={styles.image_wrapper}></div>

        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.input}>
            <input
              type="text"
              name="email"
              placeholder="Please enter your student email"
            />
          </div>
          <div className={styles.input}>
            <input
              type={!show ? "password" : "text"}
              name="password"
              placeholder="Please enter your password"
            />
            <br />
            <small onClick={() => setShow(!show)}>Show Password</small>
          </div>
          <Button className="mr-2 btn-main btn-sm" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default login;
