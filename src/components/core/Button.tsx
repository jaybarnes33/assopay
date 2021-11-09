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
            min-width: 150px;
            padding: 0.5rem;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
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
        `}
      </style>
    </>
  );
};

export default Button;
