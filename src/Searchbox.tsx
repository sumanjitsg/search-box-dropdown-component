import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { SearchInput } from "SearchInput";
import { SearchDropdown } from "SearchDropdown";

type Props = {
  data: Array<any>;
  filterFn: (...args: any[]) => boolean;
};

export function Searchbox({ data, filterFn }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredList([]);
    } else {
      setFilteredList(data.filter((item) => filterFn(item, inputValue)));
    }
  }, [inputValue]);

  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.currentTarget.value);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = ({ code }) => {
    if (code === "ArrowUp") {
      if (selectedOption === 0) {
        setSelectedOption(filteredList.length - 1);
      } else {
        setSelectedOption((selected) => selected - 1);
      }
    } else if (code === "ArrowDown") {
      if (selectedOption === filteredList.length - 1) {
        setSelectedOption(0);
      } else {
        setSelectedOption((selectedOption) => selectedOption + 1);
      }
    }
  };

  const onMouseOver: (index: number) => MouseEventHandler<HTMLLIElement> =
    (index: number) => () => {
      setSelectedOption(index);
    };

  return (
    <div onKeyDown={onKeyDown} className="shadow-lg w-80 divide-y-2">
      <SearchInput
        onChange={onSearchInputChange}
        aria-label="Search users"
        placeholder="Search users by ID, address, name, items and pincode"
      />
      {inputValue !== "" ? (
        <SearchDropdown
          options={filteredList}
          selectedOption={selectedOption}
          highlightString={inputValue}
          onOptionMouseOver={onMouseOver}
          className="overflow-y-auto bg-gray-200 max-h-96"
        />
      ) : null}
    </div>
  );
}
