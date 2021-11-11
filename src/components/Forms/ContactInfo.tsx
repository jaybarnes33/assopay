import { TFormik } from "./MultiStep"
import styles from "@/styles/Forms.module.scss"

export interface IStep4 {
  phone?: string
}

const ContactInfo = ({ formik }: { formik: TFormik }) => {
  const { values, handleChange } = formik

  return (
    <div className={styles.inner}>
      <div className={styles.row}>
        <div className={styles.input}>
          <label htmlFor="phone">
            Phone <span>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Ex. 0240000000"
            value={values.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
