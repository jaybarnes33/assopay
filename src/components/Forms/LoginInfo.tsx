import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Forms.module.scss";
import { IHandlers, RegisterContext, TFormik } from "./MultiStep";
import Button from "../core/Button";
import Alert from "../core/Alert";

export interface IStep2 {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginInfo = ({ formik }: { formik: TFormik }) => {
  const { data, setData } = useContext(RegisterContext);
  const [message, setMessage] = useState("");

  const { values, handleChange } = formik;

  // const handleNext = () => {
  //   setData({ ...data, ...formData })
  //   if (formData.confirmPassword === formData.password) {
  //     if (formData.email) {
  //       next()
  //     } else {
  //       setMessage("Please fill out all fields marked *")
  //     }
  //   } else {
  //     setMessage("Passwords don't match")
  //   }
  // }

  return (
    <div className={styles.form}>
      <div className={styles.inner}>
        <div className={styles.input}>
          <label htmlFor="email">
            Student Email <span>*</span>
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Ex. ce-jdoe6020@st.umat.edu.gh"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="new-password">
            Password <span>*</span>
          </label>
          <input
            required
            id="new-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="confirm-password">
            Confirm password <span>*</span>
          </label>
          <input
            required
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      {message && <Alert variant="danger">{message}</Alert>}
    </div>
  );
};

export default LoginInfo;
