export const personalInfo = {
  firstName: "",
  lastName: "",
  otherNames: "",
  gender: ""
}

export const loginInfo = {
  email: "",
  password: "",
  confirmPassword: ""
}

export const contactInfo = {
  phone: ""
}

export const institutionalInfo = {
  level: undefined,
  hall: ""
}

export const initialValues = {
  ...personalInfo,
  ...loginInfo,
  ...contactInfo,
  ...institutionalInfo
}

export type TValues = Omit<typeof initialValues, "level"> & { level?: number }
