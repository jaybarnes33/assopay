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
  gender: Yup.string().label("Gender"),
  email: Yup.string().email().required().label("Student Email"),
  password: Yup.string().min(8).required().label("Password"),
  confirmPassword: Yup.string()
    .when("password", (password, field) =>
      password
        ? field
            .required()
            .oneOf(
              [Yup.ref("password")],
              "Passwords do not match, check and try again"
            )
        : field
    )
    .label("Confirm Password"),
  level: Yup.string().required().label("Level"),
  hall: Yup.string().required().label("Hall"),
  phone: Yup.string().required().length(10).label("Phone Number"),
});
