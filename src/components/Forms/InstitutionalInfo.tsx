import { IHandlers, RegisterContext, TFormik } from "./MultiStep"
import styles from "@/styles/Forms.module.scss"
import Button from "../core/Button"
import { useContext, useEffect, useState } from "react"
import Alert from "../core/Alert"
export interface IStep3 {
  level: number
  hall: string
}
const InstitutionalInfo = ({ formik }: { formik: TFormik }) => {
  const { values, handleChange } = formik
  const [message, setMessage] = useState("")
  const halls = [
    "Chamber of Mines Hall",
    "Kofi Tetteh Hall",
    "Gold Refinery Hall",
    "Other"
  ]

  const levels = [100, 200, 300, 400]
  // const handleNext = () => {
  //   setData({ ...data, ...formData })
  //   if (formData.level && formData?.hall) {
  //     next()
  //   } else {
  //     setMessage("Fill all inputs with label *")
  //   }
  // }

  return (
    <div className={styles.inner}>
      <div className={styles.input}>
        <label htmlFor="hall">
          Hall <span>*</span>
        </label>
        <br />
        <select
          value={values.hall}
          className={styles.input}
          name="hall"
          required
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
        <label htmlFor="level">
          Level <span>*</span>
        </label>
        <select
          name="level"
          className={styles.input}
          value={values.level}
          onChange={handleChange}
          required
        >
          <option>Select Level</option>
          {levels.map((level, index) => (
            <option value={level} key={`level-${index}`}>
              {level}
            </option>
          ))}
        </select>
      </div>
      {message && <Alert variant="danger">{message}</Alert>}
    </div>
  )
}

export default InstitutionalInfo
