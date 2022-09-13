import { ComponentPropsWithoutRef } from "react";

interface InputElementProps extends ComponentPropsWithoutRef<"input"> {}

export function SearchInput({ ...props }: InputElementProps) {
  return <input type="search" {...props} />;
}
