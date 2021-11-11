import styles from "@/styles/Forms.module.scss";
import { TFormik } from "./MultiStep";

export interface IStep1 {
  gender?: string;
  firstName: string;
  lastName: string;
  otherNames: string;
}

const PersonalInfo = ({ formik }: { formik: TFormik }) => {
  const { values, errors, touched, handleChange } = formik;

  return (
    <>
      <div className={styles.inner}>
        <div className={styles.row}>
          {" "}
          <div className={styles.input}>
            <label htmlFor="firstName">
              First Name <span>*</span>
            </label>
            <input
              required
              id="firstName"
              name="firstName"
              autoCapitalize="on"
              autoComplete="given-name"
              value={values.firstName}
              onChange={handleChange}
              aria-describedby="firstName-message"
            />
            {errors.firstName && touched.firstName && (
              <small id="firstName-message">{errors.firstName}</small>
            )}
          </div>
          <div className={styles.input}>
            <label htmlFor="lastName">
              Last Name <span>*</span>
            </label>
            <input
              required
              id="lastName"
              type="text"
              name="lastName"
              autoCapitalize="on"
              autoComplete="family-name"
              value={values.lastName}
              onChange={handleChange}
              aria-describedby="lastName-message"
            />
            {errors.lastName && touched.lastName && (
              <small id="lastName-message">{errors.lastName}</small>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <label htmlFor="otherNames">Other Names</label>
            <input
              id="otherNames"
              type="text"
              name="otherNames"
              autoCapitalize="on"
              autoComplete="additional-name"
              value={values.otherNames}
              onChange={handleChange}
              aria-describedby="otherNames-message"
            />
            {errors.otherNames && touched.otherNames && (
              <small id="otherNames-message">{errors.otherNames}</small>
            )}
          </div>

          <div className={styles.input}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={styles.input}
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
