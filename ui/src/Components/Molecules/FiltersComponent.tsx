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
import { Dispatch, SetStateAction, useState } from "react";
import { IconFilter } from "@intersect.mbo/intersectmbo.org-icons-set";
import { theme } from "../../theme";

interface FilterComponentProps {
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  options: {
    value: string;
    label: string;
  }[];
  statusOptions: {
    value: string;
    label: string;
  }[];
}
export default function FiltersComponent({
  selectedFilters,
  setSelectedFilters,
  options,
  statusOptions,
}: FilterComponentProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {
    palette: { primaryBlue, neutralWhite },
  } = theme;
  const [isHovered, setIsHovered] = useState(false);

  const handleFilterChange = (value: string) => {
    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = prevSelectedFilters.includes(value)
        ? prevSelectedFilters.filter((filter) => filter !== value)
        : [...prevSelectedFilters, value];

      return updatedFilters;
    });
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
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom={1}
            width={250}
          >
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
              onClick={() => setSelectedFilters([])}
            >
              Clear
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: 2, backgroundColor: "neutralGray" }} />
        </MenuItem>
        {options.map((option, index) => (
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
                    fontSize: 18,
                  },
                }}
                name={option.value}
                checked={selectedFilters?.includes(option.value)}
                onChange={() => handleFilterChange(option.value)}
              />
            </Box>
          </MenuItem>
        ))}
        <MenuItem>
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom={1}
            width={250}
          >
            <Typography
              sx={{ color: "neutralGray", fontWeight: 500, fontSize: "14px" }}
            >
              Status
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: 2, backgroundColor: "neutralGray" }} />
        </MenuItem>
        {statusOptions.map((option, index) => (
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
                    fontSize: 18,
                  },
                }}
                name={option.value}
                checked={selectedFilters?.includes(option.value)}
                onChange={() => handleFilterChange(option.value)}
              />
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
