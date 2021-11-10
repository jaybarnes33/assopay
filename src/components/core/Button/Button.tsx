import { joinClasses } from "@/utils/join-classes"
import styles from "./button.module.scss"

interface IButtonProps {
  children: React.ReactNode
  variant?: "main" | "outlined"
  color?: "primary" | "light"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

const Button = ({
  onClick,
  children,
  variant,
  color,
  className,
  type
}: IButtonProps) => {
  return (
    <button
      className={joinClasses(
        className,
        styles.button,
        styles[`button-${variant}-${color}`]
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: "main",
  color: "primary"
}

export default Button
