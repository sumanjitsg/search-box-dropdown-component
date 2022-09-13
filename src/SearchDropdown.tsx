import {
  useState,
  useEffect,
  createRef,
  ComponentPropsWithoutRef,
  MouseEventHandler,
  useRef,
} from "react";
import { highlightAllMatches } from "searchBoxUtilities";

interface ULListElementProps extends ComponentPropsWithoutRef<"ul"> {}

type SearchDropdownProps = {
  options: any[];
  selectedOption: number;
  highlightString: string;
  onOptionMouseOver: (index: number) => MouseEventHandler<HTMLLIElement>;
} & ULListElementProps;

export function SearchDropdown({
  options,
  selectedOption,
  highlightString,
  onOptionMouseOver,
  ...ulListElementProps
}: SearchDropdownProps) {
  const parentRef = useRef<HTMLUListElement>(null);

  const listRefs = options.map((_) => createRef<HTMLLIElement>());

  useEffect(() => {
    if (selectedOption !== -1) {
      listRefs[selectedOption].current?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedOption]);

  return (
    <ul
      {...ulListElementProps}
      ref={parentRef}
      style={{
        border: "1px solid black",
        height: "200px",
        overflowY: "scroll",
      }}
    >
      {options.map((item, index) => (
        <li
          onMouseOver={onOptionMouseOver(index)}
          ref={listRefs[index]}
          key={item.id}
          style={{ borderBottom: "1px solid black" }}
          className={index === selectedOption ? "selected" : ""}
        >
          {highlightAllMatches(item, highlightString)}
        </li>
      ))}
    </ul>
  );
}
