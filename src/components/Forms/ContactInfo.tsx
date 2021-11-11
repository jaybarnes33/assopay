import React, { useContext, useEffect, useState } from "react";
import { IHandlers, RegisterContext } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";
import Button from "../core/Button";
import Alert from "../core/Alert";

export interface IStep4 {
  phone?: string;
}
const ContactInfo = ({ next, previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  const [formData, setFormData] = useState<IStep4>();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (data.phone) {
      setFormData((prevState) => ({ ...prevState, phone: data.phone }));
    }
  }, []);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrev = () => {
    setData({ ...data, ...formData });
    previous();
  };

  const handleNext = () => {
    setData({ ...data, ...formData });
    if (formData.phone) {
      next();
    } else {
      setMessage("Phone is required");
    }
  };
  return (
    <div className={styles.inner}>
      <div className={styles.row}>
        <div className={styles.input}>
          <label htmlFor="phone">
            Phone <span>*</span>
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
            onChange={handleChange}
            required
          />
        </div>
        {message && <Alert variant="danger">{message}</Alert>}
      </div>
      <div className={styles.buttons}>
        <Button
          variant="outlined"
          className="btn-outline-primary btn-sm"
          type="button"
          onClick={handlePrev}
        >
          Back
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
