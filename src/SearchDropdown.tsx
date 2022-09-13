import {
  useEffect,
  createRef,
  ComponentPropsWithoutRef,
  MouseEventHandler,
  useRef,
} from "react";
import { SearchDropdownItem } from "SearchDropdownItem";

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
    listRefs[selectedOption]?.current?.scrollIntoView({
      block: "nearest",
    });
  }, [selectedOption]);

  return (
    <ul {...ulListElementProps} ref={parentRef}>
      {options.map((item, index) => (
        <SearchDropdownItem
          key={item.id}
          ref={listRefs[index]}
          item={item}
          highlightString={highlightString}
          className={
            "p-4 border-b-2 space-y-2 cursor-pointer " +
            (index === selectedOption ? "bg-yellow-200" : "bg-white")
          }
          onMouseOver={onOptionMouseOver(index)}
        />
      ))}
    </ul>
  );
}
