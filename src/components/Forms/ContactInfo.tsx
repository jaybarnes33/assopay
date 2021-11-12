import { TFormik } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";

export interface IStep4 {
  phone?: string;
}

const ContactInfo = ({ formik }: { formik: TFormik }) => {
  const { values, errors, touched, handleChange } = formik;

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
            aria-describedby="phone-message"
            required
          />
          {errors.phone && touched.phone && (
            <small id="phone-message">{errors.phone}</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
