import { ComponentPropsWithoutRef, forwardRef } from "react";
import { renderFn } from "searchBoxUtilities";

interface LIListElementProps extends ComponentPropsWithoutRef<"li"> {}

type SearchDropdownItemProps = {
  item: any;
  highlightString: string;
} & LIListElementProps;

export const SearchDropdownItem = forwardRef<
  HTMLLIElement,
  SearchDropdownItemProps
>(function SearchDropdownItem({ item, highlightString, ...props }, ref) {
  return (
    <li ref={ref} {...props}>
      {renderFn(item, highlightString)}
    </li>
  );
});
