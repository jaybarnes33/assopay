import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Forms.module.scss";
import { IHandlers, RegisterContext } from "./MultiStep";
import Button from "../core/Button";
import Alert from "../core/Alert";

export interface IStep2 {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginInfo = ({ next, previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  const [formData, setFormData] = useState<IStep2>();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (data?.email) {
      setFormData((prevState) => ({
        ...prevState,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }));
    }
  }, []);

  const handleNext = () => {
    setData({ ...data, ...formData });
    if (formData.confirmPassword === formData.password) {
      if (formData.email) {
        next();
      } else {
        setMessage("Please fill out all fields marked *");
      }
    } else {
      setMessage("Passwords don't match");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrev = () => {
    previous();
  };
  return (
    <div className={styles.form}>
      <div className={styles.inner}>
        <div className={styles.input}>
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            required
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">
            Confirm password <span>*</span>
          </label>
          <input
            required
            name="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          className="btn-outline-primary btn-sm"
          type="button"
          onClick={handlePrev}
        >
          Back
        </Button>
        <Button
          className="btn-primary btn-sm"
          type="button"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      {message && <Alert variant="danger">{message}</Alert>}
    </div>
  );
};

export default LoginInfo;
