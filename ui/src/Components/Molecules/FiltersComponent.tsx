import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { theme } from "../../theme";
import { GOVERNANCE_ACTION_FILTERS } from "../../consts/filters";
import { GOVERNANCE_ACTION_STATUS_FILTERS } from "../../consts/status-filters";
import { useSearchParams } from "react-router-dom";
import { fadedPurple } from "../../consts/colors";
import { useTranslation } from "../../contexts/I18nContext";
import {
  IconCheveronDown,
  IconCheveronUp,
} from "@intersect.mbo/intersectmbo.org-icons-set";

export default function FiltersComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const [filterParams, setFilterParams] = useSearchParams();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    palette: {
      badgeColors: { grey },
    },
  } = theme;

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
        id="filters-button"
        data-testid="filters-button"
        aria-controls={open ? "filters-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          backgroundColor: "white",
          border: 1,
          borderColor: "borderGrey",
          borderRadius: 1,
          fontSize: 14,
          fontWeight: 400,
          height: 48,
          paddingRight: "4px",
          paddingLeft: "12px",
          cursor: "pointer",
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Typography
              sx={{
                color: isHovered || open ? "textBlack" : grey,
                fontWeight: 400,
                paddingLeft: 0.5,
              }}
            >
              {t("outcomesList.filters.title")}
            </Typography>
            <Box
              sx={{
                padding: "2px",
                borderRadius: "50%",
                color: "action.active",
                transition:
                  "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "28px",
                height: "28px",
              }}
            >
              {open ? (
                <IconCheveronUp width={18} height={18} fill="textBlack" />
              ) : (
                <IconCheveronDown width={18} height={18} fill="textBlack" />
              )}
            </Box>
          </Box>
        </Box>
      </Button>
      <Menu
        id="filters-menu"
        data-testid="filters-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ marginTop: 1 }}
      >
        <Box
          display="flex"
          paddingX="20px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              color: fadedPurple.c500,
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {t("outcome.governanceActionType")}
          </Typography>
          <Button
            id="clear-filters-button"
            data-testid="clear-filters-button"
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
              {t("outcomesList.filters.clear")}
            </Typography>
          </Button>
        </Box>

        <Divider sx={{ marginTop: 1, backgroundColor: "neutralGray" }} />
        {GOVERNANCE_ACTION_FILTERS.map((option, index) => (
          <Box
            id={`${option.dataTestId}-checkbox-wrapper`}
            data-testid={`${option.dataTestId}-checkbox-wrapper`}
            key={index}
            paddingX="20px"
            sx={{
              cursor: "pointer",
              "&:hover": { bgcolor: "#E6EBF7" },
            }}
            bgcolor={isTypeChecked(option.value) ? "#FFF0E7" : "transparent"}
            onClick={() => handleTypeChange(option.value)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id={`${option.dataTestId}-checkbox`}
                  data-testid={`${option.dataTestId}-checkbox`}
                  checked={isTypeChecked(option.value)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleTypeChange(option.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  name={option.value}
                />
              }
              label={option.label}
              onClick={(e) => e.stopPropagation()}
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
            {t("outcome.status.fullTitle")}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1, backgroundColor: "neutralGray" }} />
        {GOVERNANCE_ACTION_STATUS_FILTERS.map((option, index) => (
          <Box
            id={`${option.value}-checkbox-wrapper`}
            data-testid={`${option.value}-checkbox-wrapper`}
            key={index}
            paddingX="20px"
            sx={{
              cursor: "pointer",
              "&:hover": { bgcolor: "#E6EBF7" },
            }}
            bgcolor={isStatusChecked(option.value) ? "#FFF0E7" : "transparent"}
            onClick={() => handleStatusChange(option.value)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id={`${option.value}-checkbox`}
                  data-testid={`${option.value}-checkbox`}
                  checked={isStatusChecked(option.value)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleStatusChange(option.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  name={option.value}
                />
              }
              label={option.label}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        ))}
      </Menu>
    </Box>
  );
}
