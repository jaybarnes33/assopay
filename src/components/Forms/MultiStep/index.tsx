import React, { useState } from "react";

const MultiStep = ({ maxSteps }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1 != 0 ? step - 1 : 1);
  };
  return <div></div>;
};

export default MultiStep;
