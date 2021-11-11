import { SetableContext } from "@/interfaces/setable-context";
import React, { ReactNode, useState } from "react";
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
import { initialValues, TValues } from "./form-config";
export interface IHandlers {
  next?: () => void;
  previous?: () => void;
}

export type IRegisterProps = Partial<IStep1 & IStep2 & IStep3 & IStep4>;

export const RegisterContext = React.createContext<
  SetableContext<IRegisterProps>
>({});

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
  const [data, setData] = useState<IRegisterProps>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  const { handleSubmit, ...formik } = useFormik<TValues>({
    initialValues,
    onSubmit: submitHandler,
  });

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <CurrentStep activeStep={step} formik={formik} />
        {step === 5 && (
          <p>Thanks for filling this form, press submit to continue</p>
        )}

        <div className={styles.buttons}>
          <Button color="light" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>
          {step === 4 ? (
            <Button
              type="submit"
              disabled={step < 4}
              onClick={() => console.log("clicked")}
            >
              Submit
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
