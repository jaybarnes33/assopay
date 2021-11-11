import * as Yup from "yup";

export const personalInfo = {
  firstName: "",
  lastName: "",
  otherNames: "",
  gender: "",
};

export const loginInfo = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const contactInfo = {
  phone: "",
};

export const institutionalInfo = {
  level: undefined,
  hall: "",
};

export const initialValues = {
  ...personalInfo,
  ...loginInfo,
  ...contactInfo,
  ...institutionalInfo,
};

export type TValues = Omit<typeof initialValues, "level"> & { level?: number };

export const validationSchema = Yup.object({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  otherNames: Yup.string().label("Other Names"),
  email: Yup.string().email().required().label("Student Email"),
  password: Yup.string().min(8).required().label("Password"),
  confirmPassword: Yup.ref("password"),
});
