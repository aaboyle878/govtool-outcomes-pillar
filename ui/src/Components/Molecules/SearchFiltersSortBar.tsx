import { Box, InputBase } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconSearch } from "@intersect.mbo/intersectmbo.org-icons-set";
import { theme } from "../../theme";
import FiltersComponent from "./FiltersComponent";
import SortComponent from "./SortComponent";
import { useScreenDimension } from "../../hooks/useDimensions";
import { useSearchParams } from "react-router-dom";

interface SearchFiltersSortBarProps {
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  filterOptions: {
    value: string;
    label: string;
  }[];
  statusOptions: {
    value: string;
    label: string;
  }[];
  sortOptions: {
    value: string;
    label: string;
  }[];
  selectedSorting: string;
  setSelectedSorting: Dispatch<SetStateAction<string>>;
}

export default function SearchFiltersSortBar({
  ...props
}: SearchFiltersSortBarProps) {
  const {
    selectedFilters,
    setSelectedFilters,
    filterOptions,
    statusOptions,
    sortOptions,
    selectedSorting,
    setSelectedSorting,
  } = props;

  const {
    palette: { neutralGray },
  } = theme;

  const { isMobile } = useScreenDimension();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setSearchParams({ q: searchTerm });
      } else {
        searchParams.delete("q");
        setSearchParams(searchParams);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams, searchParams]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      marginBottom={4}
      gap={isMobile ? 1 : 1.5}
    >
      <InputBase
        inputProps={{ "data-testid": "search-input" }}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Action..."
        value={searchTerm}
        startAdornment={
          <IconSearch width={18} height={18} fill={neutralGray} />
        }
        sx={{
          bgcolor: "neutralWhite",
          border: 1,
          borderColor: "secondaryBlue",
          borderRadius: 50,
          fontSize: 11,
          fontWeight: 500,
          height: 48,
          padding: "16px 24px",
          "& .MuiInputBase-input": {
            paddingLeft: "4px",
          },
        }}
      />
      <FiltersComponent
        options={filterOptions}
        statusOptions={statusOptions}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <SortComponent
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
        sortOptions={sortOptions}
      />
    </Box>
  );
}
