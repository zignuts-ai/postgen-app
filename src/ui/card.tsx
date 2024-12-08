import React from "react";
import {
  Card as MUICard,
  CardProps as MUICardProps,
  CardHeader as MUICardHeader,
  CardContent as MUICardContent,
  CardActions as MUICardFooter,
  Typography,
} from "@mui/material";

export const Card = React.forwardRef<HTMLDivElement, MUICardProps>(
  ({ children, ...props }, ref) => (
    <MUICard ref={ref} {...props}>
      {children}
    </MUICard>
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, MUICardProps>(
  ({ children, ...props }, ref) => (
    <MUICardHeader
      ref={ref}
      {...props}
      title={
        children &&
        React.Children.map(children, (child) =>
          React.isValidElement(child) && child.type === CardTitle ? child : null
        )
      }
      subheader={
        children &&
        React.Children.map(children, (child) =>
          React.isValidElement(child) && child.type === CardDescription
            ? child
            : null
        )
      }
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = ({ children, ...props }) => (
  <Typography variant="h5" {...props}>
    {children}
  </Typography>
);
CardTitle.displayName = "CardTitle";

export const CardDescription = ({ children, ...props }) => (
  <Typography variant="body2" color="text.secondary" {...props}>
    {children}
  </Typography>
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, MUICardProps>(
  ({ children, ...props }, ref) => (
    <MUICardContent ref={ref} {...props}>
      {children}
    </MUICardContent>
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, MUICardProps>(
  ({ children, ...props }, ref) => (
    <MUICardFooter ref={ref} {...props}>
      {children}
    </MUICardFooter>
  )
);
CardFooter.displayName = "CardFooter";

// Example usage
export const CardExample = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here</CardDescription>
    </CardHeader>
    <CardContent>Card content</CardContent>
    <CardFooter>Card footer</CardFooter>
  </Card>
);
