import { v4 as uuidv4 } from "uuid";

type HighlightedMatchesInStringProps = {
  inputString: string;
  searchString: string;
  highlightClassName: string;
};

function HighlightedMatchesInString({
  inputString,
  searchString,
  highlightClassName,
}: HighlightedMatchesInStringProps) {
  let position = 0;

  type Token = { id: string; subString: string; matched: boolean };
  const tokens: Token[] = [];

  while (position < inputString.length) {
    const searchIndex = inputString
      .toLowerCase()
      .indexOf(searchString.toLowerCase(), position);

    if (searchIndex === -1) {
      tokens.push({
        id: uuidv4(),
        subString: inputString.substring(position),
        matched: false,
      });

      position = inputString.length;
    } else {
      tokens.push({
        id: uuidv4(),
        subString: inputString.substring(position, searchIndex),
        matched: false,
      });
      tokens.push({
        id: uuidv4(),
        subString: inputString.substring(
          searchIndex,
          searchIndex + searchString.length
        ),
        matched: true,
      });

      position = searchIndex + searchString.length;
    }
  }

  return (
    <>
      {tokens.map((token) => {
        return token.matched === true ? (
          <span key={token.id} className={highlightClassName}>
            {token.subString}
          </span>
        ) : (
          <span key={token.id}>{token.subString}</span>
        );
      })}
    </>
  );
}

type HighlightedMatchesInArrayProps = {
  arrayName: string;
  inputArray: string[];
  searchString: string;
  highlightClassName: string;
};

function HighlightedMatchesInArray({
  arrayName,
  inputArray,
  searchString,
  highlightClassName,
}: HighlightedMatchesInArrayProps) {
  console.log("highlightedmatchesinarray");

  return inputArray.some((item) =>
    item.toLowerCase().includes(searchString.toLowerCase())
  ) === true ? (
    <div className="border-y-2 py-1">
      <span className={highlightClassName}>&#8226;</span> "{searchString}" found
      in {arrayName}
    </div>
  ) : null;
}

type User = any;

const userPropertyStyles = {
  id: "font-bold text-lg leading-none",
  name: "font-bold italic",
};

type UserPropertyStylesKeyType = keyof typeof userPropertyStyles;

function getUserPropertyStyles(key: any) {
  return userPropertyStyles[key as UserPropertyStylesKeyType] ?? "";
}

export function renderFn(user: User, searchString: string) {
  return (
    <>
      {Object.keys(user).map((key) => {
        if (Array.isArray(user[key])) {
          return (
            <div className={getUserPropertyStyles(key)} key={key}>
              <HighlightedMatchesInArray
                arrayName={key}
                inputArray={user[key]}
                searchString={searchString}
                highlightClassName="text-blue-700"
              />
            </div>
          );
        } else if (typeof user[key] === "string") {
          return (
            <div className={getUserPropertyStyles(key)} key={key}>
              <HighlightedMatchesInString
                key={key}
                inputString={user[key]}
                searchString={searchString}
                highlightClassName="text-blue-700"
              />
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
