import { ComponentPropsWithoutRef } from "react";

interface InputElementProps extends ComponentPropsWithoutRef<"input"> {}

export function SearchInput({ ...props }: InputElementProps) {
  return <input type="search" {...props} className="py-2 px-4 w-full" />;
}
