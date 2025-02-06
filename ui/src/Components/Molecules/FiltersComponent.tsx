import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  Menu,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IconFilter } from "@intersect.mbo/intersectmbo.org-icons-set";
import { theme } from "../../theme";
import { GOVERNANCE_ACTION_FILTERS } from "../../consts/filters";
import { GOVERNANCE_ACTION_STATUS_FILTERS } from "../../consts/status-filters";
import { useSearchParams } from "react-router-dom";
import { fadedPurple } from "../../consts/colors";

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

  const getActiveFilterCount = () => {
    const typeFilters = filterParams.get("type")?.split(",") || [];
    const statusFilters = filterParams.get("status")?.split(",") || [];
    return typeFilters.length + statusFilters.length;
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
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          {!open && (
            <Badge
              badgeContent={getActiveFilterCount()}
              color="secondary"
              sx={{
                position: "absolute",
                top: 2,
                right: 0,
                transform: "translate(50%, -50%)",
                zIndex: 1,
              }}
              componentsProps={{
                badge: {
                  style: {
                    color: "white",
                  },
                },
              }}
            />
          )}
          <IconFilter
            width={18}
            height={18}
            fill={isHovered || open ? neutralWhite : primaryBlue}
          />
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ marginTop: 1 }}
      >
        <Box display="flex" paddingX="20px" justifyContent="space-between">
          <Typography
            sx={{
              color: fadedPurple.c500,
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Governance Action Type
          </Typography>
          <Box
            sx={{
              color: "primaryBlue",
              fontWeight: 500,
              fontSize: 14,
              paddingX: 1,
              cursor: "pointer",
              borderRadius: "10%",
              "&:hover": { bgcolor: "#E6EBF7" },
            }}
            onClick={clearFilters}
          >
            <Typography fontSize={14} fontWeight={500} color="primary">
              clear
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ marginTop: 1, backgroundColor: "neutralGray" }} />
        {GOVERNANCE_ACTION_FILTERS.map((option, index) => (
          <Box
            key={index}
            paddingX="20px"
            sx={[{ "&:hover": { bgcolor: "#E6EBF7" } }]}
            bgcolor={isTypeChecked(option.value) ? "#FFF0E7" : "transparent"}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleTypeChange(option.value)}
                  name={option.value}
                  checked={isTypeChecked(option.value)}
                />
              }
              label={option.label}
            />
          </Box>
        ))}
        <Box
          display="flex"
          paddingX="20px"
          justifyContent="space-between"
          width={250}
        >
          <Typography
            sx={{
              color: fadedPurple.c500,
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Status
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1, backgroundColor: "neutralGray" }} />
        {GOVERNANCE_ACTION_STATUS_FILTERS.map((option, index) => (
          <Box
            key={index}
            paddingX="20px"
            sx={[{ "&:hover": { bgcolor: "#E6EBF7" } }]}
            bgcolor={isStatusChecked(option.value) ? "#FFF0E7" : "transparent"}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleStatusChange(option.value)}
                  name={option.value}
                  checked={isStatusChecked(option.value)}
                />
              }
              label={option.label}
            />
          </Box>
        ))}
      </Menu>
    </Box>
  );
}
