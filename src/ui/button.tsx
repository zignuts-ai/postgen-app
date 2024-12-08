import React from "react";
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from "@mui/material";

// Define variant and size mappings
const variantMap = {
  default: "contained",
  destructive: "contained",
  outline: "outlined",
  secondary: "contained",
  ghost: "text",
  link: "text",
};

const colorMap = {
  default: "primary",
  destructive: "error",
  secondary: "secondary",
  ghost: "primary",
  link: "primary",
};

const sizeMap = {
  default: "medium",
  sm: "small",
  lg: "large",
  icon: "small",
};

export interface ButtonProps extends MUIButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", asChild, ...props }, ref) => {
    // If asChild is true, you might want to use a different approach in MUI
    return (
      <MUIButton
        ref={ref}
        variant={variantMap[variant]}
        color={colorMap[variant]}
        size={sizeMap[size]}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Export variant function for consistent styling
export const buttonVariants = (options: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) => {
  const { variant = "default", size = "default" } = options;
  return {
    variant: variantMap[variant],
    color: colorMap[variant],
    size: sizeMap[size],
  };
};
