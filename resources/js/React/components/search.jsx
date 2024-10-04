import React, { useContext, useEffect } from "react";
import { getSvgNav } from "../svg/nav.jsx";
import { AppContext } from "../contexts/appContext.jsx";

function Search() {
  const { search, setSearch } = useContext(AppContext);

  useEffect(() => {
    setSearch({ ...search, value: "", start: false });
  }, [search.placeholder]);

  return (
    <div className="body-search">
      {getSvgNav("search")}
      <input
        type="text"
        placeholder={`Search ${search.placeholder}`}
        value={search.value}
        onChange={(e) =>
          setSearch({ ...search, value: e.target.value, start: false })
        }
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setSearch({ ...search, start: true });
            e.target.blur();
          }
        }}
      />
    </div>
  );
}

export default Search;
