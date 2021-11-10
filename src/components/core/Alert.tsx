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
            display: flex;
            align-items: stretch;
            padding: 1rem 1rem;
            margin: 0 0 20px;
            border-radius: 4px;
          }

          .alert-text {
            align-self: center;
            flex-grow: 1;
            line-height: 1.5;
            letter-spacing: 0.1rem;
          }

          .info {
            background-color: #5578eb;
            border: #5578eb;
            position: absolute;
            top: -5rem;
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
