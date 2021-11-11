import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Forms.module.scss";
import { IHandlers, RegisterContext } from "./MultiStep";
import Button from "../core/Button";

export interface IStep1 {
  gender?: string;
  fName: string;
  lName: string;
  otherNames: string;
}

const UserInfo = ({ next }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  const [formData, setFormData] = useState<IStep1>();

  useEffect(() => {
    if (data?.fName) {
      setFormData((prevState) => ({
        ...prevState,
        fName: data.fName,
        lName: data.lName,
        otherNames: data.otherNames,
        gender: data.gender,
      }));
    }
  }, [data]);
  const handleNext = () => {
    next();
    setData({ ...data, ...formData });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={styles.inner}>
        <div className={styles.row}>
          {" "}
          <div className={styles.input}>
            <label htmlFor="fName">
              First Name <span>*</span>
            </label>
            <input
              required
              type="text"
              name="fName"
              placeholder="Enter first name"
              value={formData?.fName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="otherNames">Other Names</label>
            <input
              type="text"
              name="otherNames"
              placeholder="Enter other names"
              value={formData?.otherNames}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <label htmlFor="lName">
              Last Name <span>*</span>
            </label>
            <input
              required
              type="text"
              name="lName"
              placeholder="Enter your last name"
              value={formData?.lName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="gender">Gender</label>
            <select
              className={styles.input}
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button className="btn-sm" type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </>
  );
};

export default UserInfo;
