import { IHandlers, RegisterContext, TFormik } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";
import Button from "../core/Button";
import { useContext, useEffect, useState } from "react";
import Alert from "../core/Alert";
export interface IStep3 {
  level: number;
  hall: string;
}
const InstitutionalInfo = ({ formik }: { formik: TFormik }) => {
  const { values, errors, touched, handleChange } = formik;
  const halls = [
    "Chamber of Mines Hall",
    "Kofi Tetteh Hall",
    "Gold Refinery Hall",
    "Other",
  ];

  const levels = [100, 200, 300, 400];

  return (
    <div className={styles.inner}>
      <div className={styles.input}>
        <label htmlFor="hall">
          Hall <span>*</span>
        </label>
        <br />
        <select
          id="hall"
          value={values.hall}
          className={styles.input}
          name="hall"
          required
          onChange={handleChange}
          aria-describedby="hall-message"
        >
          <option>Select Hall</option>
          {halls.map((hall, index) => (
            <option value={hall} key={`hall-${index}`}>
              {hall}
            </option>
          ))}
        </select>
        {errors.hall && touched.hall && (
          <small id="hall-message">{errors.hall}</small>
        )}
      </div>
      <div className={styles.input}>
        <label htmlFor="level">
          Level <span>*</span>
        </label>
        <select
          id="level"
          name="level"
          className={styles.input}
          value={values.level}
          onChange={handleChange}
          aria-describedby="level-message"
          required
        >
          <option>Select Level</option>
          {levels.map((level, index) => (
            <option value={level} key={`level-${index}`}>
              {level}
            </option>
          ))}
        </select>
        {errors.level && touched.level && (
          <small id="level-message">{errors.level}</small>
        )}
      </div>
    </div>
  );
};

export default InstitutionalInfo;
