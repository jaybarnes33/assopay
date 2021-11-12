import { SetableContext } from "@/interfaces/setable-context";
import { createContext, useState } from "react";
import ContactInfo, { IStep4 } from "../ContactInfo";
import InstitutionalInfo, { IStep3 } from "../InstitutionalInfo";
import LoginInfo, { IStep2 } from "../LoginInfo";
import PersonalInfo, { IStep1 } from "../PersonInfo";
import styles from "@/styles/Forms.module.scss";
import Button from "@/components/core/Button";
import { setAccessToken } from "@/misc/token";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import {
  contactInfo,
  initialValues,
  institutionalInfo,
  loginInfo,
  personalInfo,
  TValues,
  validationSchema,
} from "./form-config";
import Alert from "@/components/core/Alert";

export type TFormik = Omit<FormikProps<TValues>, "handleSubmit">;

const CurrentStep = ({
  activeStep,
  formik,
}: {
  activeStep: number;
  formik: TFormik;
}) => {
  const steps: Record<number, JSX.Element> = {
    1: <PersonalInfo formik={formik} />,
    2: <LoginInfo formik={formik} />,
    3: <InstitutionalInfo formik={formik} />,
    4: <ContactInfo formik={formik} />,
  };

  return steps[activeStep];
};

const MultiStep = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const submitHandler = async (
    values: TValues,
    { setSubmitting }: FormikHelpers<TValues>
  ) => {
    try {
      setSubmitting(true);
      const { data } = await axios.post("/api/users/register", values);

      if (data.refreshToken) {
        sessionStorage.setItem("token", data.refreshToken);
      }

      setAccessToken(data.accessToken);
      router.push("/dues");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError.response) {
          setError(serverError.response.data.message);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  const { handleSubmit, ...formik } = useFormik<TValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: submitHandler,
  });

  const nextStep = () => {
    const steps = {
      1: personalInfo,
      2: loginInfo,
      3: institutionalInfo,
      4: contactInfo,
    };

    const fields = Object.keys(steps[step as 1 | 2 | 3 | 4]);

    fields.forEach(field => formik.setFieldTouched(field));
    const error = Object.keys(formik.errors).some(field =>
      fields.includes(field)
    );

    !error && setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <Alert variant="danger">{error}</Alert>}
        <CurrentStep activeStep={step} formik={formik} />
        <div className={styles.buttons}>
          <Button color="light" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>
          {step === 4 ? (
            <Button type="submit" disabled={formik.isSubmitting}>
              Sign up
            </Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </div>
      </form>
    </>
  );
};

export default MultiStep;
