import React, { useContext, useState } from "react";
import styles from "@/styles/Forms.module.scss";
import { IHandlers, RegisterContext } from "./MultiStep";
import Button from "../core/Button";

export interface IStep2 {
  email: string;
  password: string;
}

const LoginInfo = ({ next, previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  const [formData, setFormData] = useState<IStep2>();

  const handleNext = () => {
    setData({ ...data, ...formData });
    next();
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Confirm password</label>
          <input
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
    </div>
  );
};

export default LoginInfo;
