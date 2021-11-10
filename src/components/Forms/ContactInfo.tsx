import React, { useContext, useState } from "react";
import { IHandlers, RegisterContext } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";
import Button from "../core/Button";

export interface IStep4 {
  phone?: string;
  socials?: Record<string, string>[];
}
const ContactInfo = ({ next, previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  const [formData, setFormData] = useState<IStep4>();

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
    next();
  };
  return (
    <div className={styles.inner}>
      <div className={styles.row}>
        <div className={styles.input}>
          <label htmlFor="Phone">Phone</label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
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
