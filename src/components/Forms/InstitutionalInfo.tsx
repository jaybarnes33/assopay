import { IHandlers, RegisterContext } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";
import Button from "../core/Button";
import { useContext, useState } from "react";
export interface IStep3 {
  level: number;
  hall?: string;
}
const InstitutionalInfo = ({ next, previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  const [formData, setFormData] = useState<IStep3>();

  const halls = [
    "Chamber of Mines Hall",
    "Kofi Tetteh Hall",
    "Gold Refinery Hall",
    "Other",
  ];

  const levels = [100, 200, 300, 400];
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
    <div className={styles.inner}>
      <div className={styles.input}>
        <label htmlFor="hall">Hall</label>
        <br />
        <select
          value={formData?.hall}
          className={styles.input}
          name="hall"
          onChange={handleChange}
        >
          <option>Select Hall</option>
          {halls.map((hall, index) => (
            <option value={hall} key={`hall-${index}`}>
              {hall}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.input}>
        <label htmlFor="level">Level</label>
        <select
          className={styles.input}
          value={formData?.level}
          onChange={handleChange}
        >
          <option>Select Level</option>
          {levels.map((level, index) => (
            <option value={level} key={`level-${index}`}>
              {level}
            </option>
          ))}
        </select>
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

export default InstitutionalInfo;
