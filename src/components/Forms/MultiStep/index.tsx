import { SetableContext } from "interfaces/setable-context";
import React, { ReactNode, useState } from "react";
import ContactInfo, { IStep4 } from "../ContactInfo";
import InstitutionalInfo, { IStep3 } from "../InstitutionalInfo";
import LoginInfo, { IStep2 } from "../LoginInfo";
import PersonalInfo, { IStep1 } from "../PersonInfo";
import styles from "@/styles/Forms.module.scss";
import Button from "@/components/core/Button";
import { setAccessToken } from "misc/token";
import axios from "axios";
import router from "next/router";
import Alert from "@/components/core/Alert";
export interface IHandlers {
  next?: () => void;
  previous?: () => void;
}

export type IRegisterProps = Partial<IStep1 & IStep2 & IStep3 & IStep4>;

export const RegisterContext = React.createContext<
  SetableContext<IRegisterProps>
>({});

const MultiStep = ({ maxSteps }) => {
  const [data, setData] = useState<IRegisterProps>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let currentStep: ReactNode;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(data);
      setLoading(true);
      const { data: res } = await axios.post("/api/users/register", {
        ...data,
      });
      if (res.refreshToken) {
        sessionStorage.setItem("token", res.refreshToken);
      }

      setAccessToken(res.accessToken);
      router.push("/dues");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1 != 0 ? step - 1 : 1);
  };

  switch (step) {
    case 1:
      currentStep = <PersonalInfo next={() => nextStep()} />;
      break;
    case 2:
      currentStep = (
        <LoginInfo next={() => nextStep()} previous={() => prevStep()} />
      );
      break;
    case 3:
      currentStep = (
        <InstitutionalInfo
          next={() => nextStep()}
          previous={() => prevStep()}
        />
      );
      break;
    case 4:
      currentStep = (
        <ContactInfo previous={() => prevStep()} next={() => nextStep()} />
      );
      break;
    default:
      break;
  }

  return (
    <RegisterContext.Provider value={{ data, setData }}>
      {error && <Alert variant="danger-bg">{error}</Alert>}
      <form onSubmit={submitHandler} className={styles.form}>
        {currentStep}
        {step === 5 && (
          <>
            Thanks for filling this form, press submit to continue
            <div className={styles.buttons}>
              <Button
                variant="outlined"
                className="btn-outline-primary btn-sm"
                onClick={() => setStep(4)}
              >
                Back
              </Button>
              <Button variant="outlined" className="btn-outline-primary btn-sm">
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </RegisterContext.Provider>
  );
};

export default MultiStep;
