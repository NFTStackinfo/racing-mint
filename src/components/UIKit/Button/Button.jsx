import * as React from "react"
import { ButtonStyle } from "./Button.style"
import { theme } from "../../../styles/theme"
import { Icon } from "../Icons/Icon"

export const Button = ({
  className,
  children,
  variant = "primary",
  onClick,
  iconName = "discord",
                           withIcon= true,
                           isLoading,
  ...props
}) => {
  return (
    <ButtonStyle
      variant={variant}
      isLoading={isLoading}
      onClick={onClick}
      className={className}
      rel="noreferrer"
      {...props}
    >
        {withIcon && <Icon name={iconName} color={theme.colors.white} />}
      {children}
        {isLoading &&
            <div className="lds-ring">
                <div/>
                <div/>
                <div/>
                <div/>
            </div>}
    </ButtonStyle>
  )
}
