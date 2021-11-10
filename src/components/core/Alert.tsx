import { ReactNode } from "react";

interface AlertProps {
  variant?: string;
  children: ReactNode;
}
const Alert = ({ variant, children }: AlertProps) => {
  return (
    <>
      <style jsx></style>
      <div className={variant}>{children}</div>
    </>
  );
};

export default Alert;
