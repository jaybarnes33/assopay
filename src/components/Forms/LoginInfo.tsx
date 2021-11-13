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
  const { values, errors, touched, handleChange } = formik;

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
            placeholder="Ex. ce-jadoe6020@st.umat.edu.gh"
            value={values.email}
            onChange={handleChange}
            aria-describedby="email-message"
          />
          {errors.email && touched.email && (
            <small id="email-message">{errors.email}</small>
          )}
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
            aria-describedby="password-message"
          />
          {errors.password && touched.password && (
            <small id="password-message">{errors.password}</small>
          )}
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
            aria-describedby="confirm-password-message"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <small id="confirm-password-message">
              {errors.confirmPassword}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginInfo;
