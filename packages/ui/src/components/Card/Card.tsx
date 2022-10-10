import React from "react";
import { Button } from "../Button";
import { ButtonProps } from "../Button/Button";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type CardButtonProps = Omit<
  ButtonProps,
  "variant" | "outline" | "children" | "size"
> & { content: React.ReactNode };

export interface CardActionButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  primaryButtonProps?: CardButtonProps;
  secondaryButtonProps?: CardButtonProps;
  dangerButtonProps?: CardButtonProps;
}

const CardActionButtons = ({
  primaryButtonProps,
  secondaryButtonProps,
  dangerButtonProps,
  className,
  ...rest
}: CardActionButtonProps) => {
  return (
    <div className={`${styles.actionButtons} ${className || ""}`} {...rest}>
      {primaryButtonProps && (
        <Button {...primaryButtonProps} size='small'>
          {primaryButtonProps.content}
        </Button>
      )}
      {secondaryButtonProps && (
        <Button {...secondaryButtonProps} outline size='small'>
          {secondaryButtonProps.content}
        </Button>
      )}
      {dangerButtonProps && (
        <Button {...dangerButtonProps} variant='danger' size='small'>
          {dangerButtonProps.content}
        </Button>
      )}
    </div>
  );
};

const CardHeader = ({ className, ...rest }: CardProps) => {
  return <header className={`${styles.header} ${className || ""}`} {...rest} />;
};

const CardContent = ({ className, ...rest }: CardProps) => {
  return <div className={`${styles.content} ${className || ""}`} {...rest} />;
};

const CardFooter = ({
  className,
  flex = "start",
  style,
  ...rest
}: CardProps & { flex?: React.CSSProperties["justifyContent"] }) => {
  return (
    <footer
      className={`${styles.footer} ${className || ""}`}
      style={{ justifyContent: flex, ...style }}
      {...rest}
    />
  );
};

const Card = ({ className, ...rest }: CardProps) => {
  return <article className={`${styles.card} ${className || ""}`} {...rest} />;
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.ActionButtons = CardActionButtons;

export default Card;
