import { Chip, ChipProps, IconButton } from "@mui/material";
import { IconX } from "@intersect.mbo/intersectmbo.org-icons-set";
import { primaryBlue } from "../../consts/colors";

interface ChipWithDeleteProps extends ChipProps {
  label: React.ReactNode;
  onDelete: () => void;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  bgColor?: string;
  variant?: "filled" | "outlined";
  testId?: string;
  sx?: object;
  iconSize?: number;
  customDeleteIcon?: React.ReactElement | null;
  deleteIconPosition?: "left" | "right";
}

const ChipWithDelete = ({
  label,
  onDelete,
  color = "primary",
  bgColor = primaryBlue.c1000,
  variant = "filled",
  size = "small",
  testId,
  sx = {},
  iconSize = 16,
  customDeleteIcon = null,
  deleteIconPosition = "right",
  ...otherProps
}: ChipWithDeleteProps) => {
  const deleteIconStyle = {
    width: iconSize,
    height: iconSize,
  };
  const deleteIcon = customDeleteIcon || (
    <IconButton>
      <IconX style={deleteIconStyle} />
    </IconButton>
  );

  return (
    <Chip
      label={label}
      onDelete={onDelete}
      data-testid={testId}
      color={color}
      variant={variant}
      size={size}
      sx={{
        backgroundColor: bgColor,
        borderRadius: 100,
        height: "auto",
        py: 0.5,
        pl: 1.5,
        pr: 2.25,
        "& .MuiChip-label": {
          fontSize: 12,
          fontWeight: 400,
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          color: "textBlack",
          px: 0,
          py: 0,
        },
        display: "flex",
        flexDirection: deleteIconPosition === "right" ? "row" : "row-reverse",
        gap: 0.5,
        ...sx,
      }}
      deleteIcon={deleteIcon}
      {...otherProps}
    />
  );
};

export default ChipWithDelete;
