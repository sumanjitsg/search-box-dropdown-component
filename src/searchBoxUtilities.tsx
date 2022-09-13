export function highlightAllMatches(object: any, searchString: string) {
  return (
    <>
      {Object.values(object).map((searchValue) => {
        if (Array.isArray(searchValue)) {
          return searchValue.some((item) =>
            item.toLowerCase().includes(searchString.toLowerCase())
          ) === true ? (
            <div key={"array"} className="highlight">
              "{searchString}" found in items
            </div>
          ) : null;
        } else if (typeof searchValue === "string") {
          let position = 0;
          const splitTokens = [];

          while (position >= 0 && position < searchValue.length) {
            const searchIndex = searchValue
              .toLowerCase()
              .indexOf(searchString.toLowerCase(), position);

            if (searchIndex === -1) {
              splitTokens.push({
                str: searchValue.substring(position),
                match: false,
              });

              position = searchValue.length;
            } else {
              splitTokens.push({
                str: searchValue.substring(position, searchIndex),
                match: false,
              });
              splitTokens.push({
                str: searchValue.substring(
                  searchIndex,
                  searchIndex + searchString.length
                ),
                match: true,
              });

              position = searchIndex + searchString.length;
            }
          }

          return (
            <div>
              {splitTokens.map((token) => (
                <span
                  key={token.str}
                  className={token.match === true ? "highlight" : ""}
                >
                  {token.str}
                </span>
              ))}
            </div>
          );
        }
      })}
    </>
  );
}
