import { ReactNode } from "react"

interface AlertProps {
  variant?: string
  children: ReactNode
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
            width: 100%;
            display: flex;
            justify-content: center;
            border-radius: 4px;
          }

          .alert-text {
            align-self: center;
            flex-grow: 1;
            line-height: 1.5;
            letter-spacing: 0.1rem;
          }

          .info {
            left: 0;
            background-color: #5578eb;
            border: #5578eb;
            position: absolute;
            top: -3rem;
            width: 100%;
            text-align: center;
            color: #f4f4f4;
          }
        `}
      </style>
    </>
  )
}

export default Alert
