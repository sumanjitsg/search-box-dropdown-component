import { createRef, useEffect, useRef, useState } from "react";

type Props = {
  searchList: Array<any>;
};

export function Searchbox({ searchList }: Props) {
  const [value, setValue] = useState("");
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [selected, setSelected] = useState(-1);

  const listRefs = filteredList.map((item) => createRef<HTMLLIElement>());

  useEffect(() => {
    if (selected !== -1) {
      listRefs[selected].current?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selected]);

  const handleChange = (value: string) => {
    setValue(value);

    setFilteredList(
      searchList.filter((searchObject) =>
        Object.values(searchObject).some((searchValue) => {
          if (Array.isArray(searchValue)) {
            return searchValue.some((item) =>
              item.toLowerCase().includes(value.toLowerCase())
            );
          } else if (typeof searchValue === "string") {
            return searchValue.toLowerCase().includes(value.toLowerCase());
          } else {
            return false;
          }
        })
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = e.code;

    if (keyCode === "ArrowUp") {
      if (selected === -1) {
        setSelected(filteredList.length - 1);
      } else {
        setSelected((selected) => selected - 1);
      }
    } else if (keyCode === "ArrowDown") {
      if (selected === filteredList.length - 1) {
        setSelected(-1);
      } else {
        setSelected((selected) => selected + 1);
      }
    }
  };

  const handleMouseOver = (index: number) => {
    setSelected(index);
  };

  const handleMouseLeave = () => {
    setSelected(-1);
  };

  return (
    <div onKeyDown={(e) => handleKeyDown(e)}>
      <input
        type="search"
        value={value}
        onChange={(e) => {
          handleChange(e.currentTarget.value);
        }}
        aria-label="Search users"
        placeholder="Search users by ID, address, name, items and pincode"
        list="filtered-users"
      />
      <ul
        onMouseLeave={() => handleMouseLeave()}
        style={{
          border: "1px solid black",
          height: "200px",
          overflowY: "scroll",
        }}
      >
        {filteredList.map((item, index) => (
          <li
            ref={listRefs[index]}
            key={item.id}
            style={{ borderBottom: "1px solid black" }}
            className={index === selected ? "selected" : ""}
            onMouseOver={() => handleMouseOver(index)}
          >
            {Object.values(item).map((itemValue: any) => (
              <div key={itemValue}>{itemValue}</div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
