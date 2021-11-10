import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
const Button = ({ onClick, children, className, type }: IButtonProps) => {
  return (
    <>
      <button className={className} onClick={onClick} type={type}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            border: none;
            min-width: 150px;
            padding: 0.5rem;
            display: grid;
            place-items: center;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
            text-align: center;
          }

          button:hover {
            transform: scale(1.1);
          }
          button:hover,
          button:active {
            outline: none;
          }

          .btn-main {
            background-color: #134824;
            color: #f4f4f4;
          }

          .btn-light {
            background-color: #f4f4f4;
            color: #134824;
          }

          .btn-primary {
            color: #fff;
            background-color: #3699ff;
            border-color: #3699ff;
          }

          .btn-outline-main {
            border: 1px solid #134824;
            background-color: white;
          }

          .btn-sm {
            text-align: center;
            min-width: 100px;
          }
        `}
      </style>
    </>
  );
};

export default Button;
