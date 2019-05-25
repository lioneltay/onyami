import React from "react"

import {
  default as Typography,
  TypographyProps,
} from "@material-ui/core/Typography"

export type TextProps = TypographyProps & {
  bold?: boolean
}

const Text = ({
  children,
  inline,
  component,
  className,
  bold,
  variant,
  ...typographyProps
}: TextProps) => {
  return (
    <Typography
      css={`
        ${variant === "overline" ? "font-size: 10px; line-height: 1.5;" : ""}
      `}
      {...typographyProps}
      color={undefined}
      variant={variant}
      className={[
        bold === undefined ? undefined : bold ? "text-500" : "text-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      inline={inline}
      component={component || (inline ? "span" : "div")}
    >
      {children}
    </Typography>
  )
}

export default Text
