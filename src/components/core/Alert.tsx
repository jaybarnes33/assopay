interface AlertProps {
  variant?: string;
  children: React.ReactNode;
}
const Alert = ({ variant, children }: AlertProps) => {
  return (
    <>
      <div className={`alert ${variant}`}>
        <div className="alert-text">{children}</div>
      </div>
      <style jsx>
        {`
          .alert {
            display: flex;
            justify-content: center;
            padding: 0.5rem 1rem;
          }

          .alert-text {
            align-self: center;
            flex-grow: 1;
            line-height: 1.5;
            letter-spacing: 0.1rem;
          }

          .info {
            left: 0;
            background-color: var(--primary-color-focus);
            border: #5578eb;
            position: absolute;
            top: -1rem;
            width: 100%;
            border-radius: 4px 4px 0 0;
            text-align: center;
            color: #f4f4f4;
          }

          .danger {
            margin: 1rem 0;
            color: red;
          }

          .danger-bg {
            background-color: tomato;
            color: white;
          }

          @media screen and (max-width: 1024px) {
            .info {
              top: -4rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Alert;
