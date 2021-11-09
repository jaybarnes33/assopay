import React from "react";

const Button = ({ onClick, children, className }) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            border: none;
          }

          button:hover,
          button:active {
            outline: none;
          }

          .btn-main {
            background-color: #134824;
            color: #f4f4f4;
          }
        `}
      </style>
    </>
  );
};

export default Button;
