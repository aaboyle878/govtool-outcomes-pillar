import {
  Box,
  Divider,
  Typography,
  Button,
  Menu,
  MenuItem,
  Fade,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import UpDownArrowsIcon from "../../Assets/Icons/UpdownArrows";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { GOVERNANCE_ACTION_SORT_OPTIONS } from "../../consts/sort-options";

export default function SortComponent() {
  const {
    palette: { primaryBlue, neutralWhite },
  } = theme;

  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortParams, setSortParams] = useSearchParams();

  useEffect(() => {
    const currentSort = sortParams.get("sort");
    if (!currentSort) {
      const newParams = new URLSearchParams(sortParams);
      newParams.set("sort", "newestFirst");
      setSortParams(newParams);
    }
  }, []);

  const handleShowOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const setSorts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(sortParams);
    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }
    setSortParams(newParams);
  };

  const sortValue = () => {
    return sortParams.get("sort")?.toString() || "";
  };

  const clearSort = () => {
    const newParams = new URLSearchParams(sortParams);
    newParams.delete("sort");
    setSortParams(newParams);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          backgroundColor: open ? "secondary.main" : "neutralWhite",
          border: 1,
          borderColor: open ? "secondary.main" : "secondaryBlue",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 500,
          height: 48,
          padding: "0 16px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "secondary.main",
            borderColor: "secondary.main",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleShowOptions}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <UpDownArrowsIcon
              color={isHovered || open ? neutralWhite : primaryBlue}
            />
          </Box>
          <Typography
            sx={{
              color: isHovered || open ? "neutralWhite" : "primaryBlue",
              fontWeight: 500,
              paddingLeft: 0.5,
            }}
          >
            Sort
          </Typography>
        </Box>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ marginTop: 1 }}
      >
        <MenuItem>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography
              sx={{ color: "neutralGray", fontWeight: 500, fontSize: "14px" }}
            >
              Sort by
            </Typography>
            <Typography
              sx={{
                color: "primaryBlue",
                fontWeight: 500,
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={clearSort}
            >
              Clear
            </Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ marginBottom: 2, backgroundColor: "neutralGray" }} />
        <RadioGroup
          value={sortValue()}
          onChange={setSorts}
          sx={{
            paddingX: 2,
            "& .MuiFormControlLabel-label": {
              fontSize: "14px",
            },
            "& .MuiSvgIcon-root": {
              fontSize: "20px",
            },
          }}
        >
          {GOVERNANCE_ACTION_SORT_OPTIONS.map((option, idx) => (
            <FormControlLabel
              key={idx}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </Menu>
    </Box>
  );
}
