import {
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormLabel,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IconFilter } from "@intersect.mbo/intersectmbo.org-icons-set";
import { theme } from "../../theme";
import { GOVERNANCE_ACTION_FILTERS } from "../../consts/filters";
import { GOVERNANCE_ACTION_STATUS_FILTERS } from "../../consts/status-filters";
import { useSearchParams } from "react-router-dom";

export default function FiltersComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    palette: { primaryBlue, neutralWhite },
  } = theme;
  const [isHovered, setIsHovered] = useState(false);
  const [filterParams, setFilterParams] = useSearchParams();

  const handleTypeChange = (value: string) => {
    const newParams = new URLSearchParams(filterParams);
    const currentTypesStr = newParams.get("type") || "";
    const currentTypes = currentTypesStr ? currentTypesStr.split(",") : [];

    if (currentTypes.includes(value)) {
      const updatedTypes = currentTypes.filter((type) => type !== value);
      if (updatedTypes.length === 0) {
        newParams.delete("type");
      } else {
        newParams.set("type", updatedTypes.join(","));
      }
    } else {
      const updatedTypes = [...currentTypes, value];
      newParams.set("type", updatedTypes.join(","));
    }

    setFilterParams(newParams);
  };

  const handleStatusChange = (value: string) => {
    const newParams = new URLSearchParams(filterParams);
    const currentStatusStr = newParams.get("status") || "";
    const currentStatuses = currentStatusStr ? currentStatusStr.split(",") : [];

    if (currentStatuses.includes(value)) {
      const updatedStatuses = currentStatuses.filter(
        (status) => status !== value
      );
      if (updatedStatuses.length === 0) {
        newParams.delete("status");
      } else {
        newParams.set("status", updatedStatuses.join(","));
      }
    } else {
      const updatedStatuses = [...currentStatuses, value];
      newParams.set("status", updatedStatuses.join(","));
    }

    setFilterParams(newParams);
  };

  const isTypeChecked = (value: string) => {
    const currentTypesStr = filterParams.get("type") || "";
    return currentTypesStr ? currentTypesStr.split(",").includes(value) : false;
  };

  const isStatusChecked = (value: string) => {
    const currentStatusStr = filterParams.get("status") || "";
    return currentStatusStr
      ? currentStatusStr.split(",").includes(value)
      : false;
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(filterParams);
    newParams.delete("type");
    newParams.delete("status");
    setFilterParams(newParams);
  };

  const handleShowOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <IconFilter
              width={18}
              height={18}
              fill={isHovered || open ? neutralWhite : primaryBlue}
            />
          </Box>
          <Typography
            sx={{
              color: isHovered || open ? "neutralWhite" : "primaryBlue",
              fontWeight: 500,
              paddingLeft: 0.5,
            }}
          >
            Filter
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
          <Box display="flex" justifyContent="space-between" width={250}>
            <Typography
              sx={{ color: "neutralGray", fontWeight: 500, fontSize: "14px" }}
            >
              Governance Action Type
            </Typography>
            <Typography
              sx={{
                color: "primaryBlue",
                fontWeight: 500,
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={clearFilters}
            >
              Clear
            </Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ marginBottom: 2, backgroundColor: "neutralGray" }} />
        {GOVERNANCE_ACTION_FILTERS.map((option, index) => (
          <MenuItem key={index}>
            <Box
              sx={{
                width: "100%",
                marginBottom: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FormLabel sx={{ fontSize: "14px" }}>{option.label}</FormLabel>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                  },
                }}
                name={option.value}
                checked={isTypeChecked(option.value)}
                onChange={() => handleTypeChange(option.value)}
              />
            </Box>
          </MenuItem>
        ))}
        <MenuItem>
          <Box display="flex" justifyContent="space-between" width={250}>
            <Typography
              sx={{ color: "neutralGray", fontWeight: 500, fontSize: "14px" }}
            >
              Status
            </Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ marginBottom: 2, backgroundColor: "neutralGray" }} />
        {GOVERNANCE_ACTION_STATUS_FILTERS.map((option, index) => (
          <MenuItem key={index}>
            <Box
              sx={{
                width: "100%",
                marginBottom: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FormLabel sx={{ fontSize: "14px" }}>{option.label}</FormLabel>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                  },
                }}
                name={option.value}
                checked={isStatusChecked(option.value)}
                onChange={() => handleStatusChange(option.value)}
              />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
