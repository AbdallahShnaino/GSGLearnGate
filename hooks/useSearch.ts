import { useState, useMemo } from "react";

function useSearch<T>(data: T[], searchField: keyof T) {
  const [searchTerm, setSearchTerm] = useState("");


  const filteredData = useMemo(() => {
    return data.filter((item) =>
      String(item[searchField]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data, searchField]);

  return { searchTerm, setSearchTerm, filteredData };
}

export default useSearch;
