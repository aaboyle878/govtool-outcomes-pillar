import { Box, IconButton, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { IconSearch, IconX } from "@intersect.mbo/intersectmbo.org-icons-set";
import { theme } from "../../theme";
import FiltersComponent from "./FiltersComponent";
import SortComponent from "./SortComponent";
import { useScreenDimension } from "../../hooks/useDimensions";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "../../contexts/I18nContext";
import { primaryBlue } from "../../consts/colors";

export default function SearchFiltersSortBar() {
  const {
    palette: { textBlack },
  } = theme;
  const { isMobile } = useScreenDimension();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchTerm) {
          newParams.set("q", searchTerm);
        } else {
        newParams.delete("q");
      }
      setSearchParams(newParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setSearchParams, searchParams]);

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems={isMobile ? "stretch" : "center"}
      justifyContent="space-between"
      gap={isMobile ? 1 : 1.5}
    >
      <InputBase
        id="search-input"
        inputProps={{ "data-testid": "search-input" }}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("outcomesList.searchPlaceholder")}
        value={searchTerm}
        startAdornment={
          <IconSearch
            width={20}
            height={18}
            fill={primaryBlue.c200}
            strokeWidth={5}
          />
        }
        endAdornment={
          searchTerm && (
            <IconButton
              onClick={() => setSearchTerm("")}
              data-testid="clear-search-input"
              aria-label={t("outcomesList.clearSearchInput")}
              role="button"
            >
              <IconX width={18} height={18} fill={textBlack} />
            </IconButton>
          )
        }
        sx={{
          bgcolor: "neutralWhite",
          border: 1,
          borderColor: "borderGrey",
          borderRadius: 1,
          fontSize: 15,
          fontWeight: 400,
          height: 48,
          paddingY: 2,
          paddingLeft: 2.5,
          "& .MuiInputBase-input": {
            paddingLeft: 1,
          },
        }}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        gap={isMobile ? 1 : 1.5}
      >
        <FiltersComponent />
        <SortComponent />
      </Box>
    </Box>
  );
}
