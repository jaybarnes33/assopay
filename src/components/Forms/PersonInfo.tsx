import React, { useContext, useEffect, useState } from "react"
import styles from "@/styles/Forms.module.scss"
import { IHandlers, RegisterContext, TFormik } from "./MultiStep"
import Button from "../core/Button"

export interface IStep1 {
  gender?: string
  firstName: string
  lastName: string
  otherNames: string
}

const PersonalInfo = ({ formik }: { formik: TFormik }) => {
  const { data, setData } = useContext(RegisterContext)

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
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
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
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <label htmlFor="lName">
              Last Name <span>*</span>
            </label>
            <input
              id="otherNames"
              type="text"
              name="otherNames"
              autoCapitalize="on"
              autoComplete="additional-name"
              value={formik.values.otherNames}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className={styles.input}
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalInfo
