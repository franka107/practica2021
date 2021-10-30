import { IconButton } from "@material-ui/core";
import { Edit, Delete, Star, StarBorder, Visibility } from "@material-ui/icons";

const TableButtons = ({
  onClickDeleteButton,
  onClickEditButton = () => {},
  onClickEyeButton,
  onClickStarButton,
  starButtonFeatured = false,
}) => {
  return (
    <>
      {onClickEyeButton && (
        <IconButton
          style={{ color: "#C25560" }}
          size="small"
          aria-label="delete"
          onClick={onClickEyeButton}
        >
          <Visibility fontSize="small" />
        </IconButton>
      )}
      <IconButton
        style={{ color: "#C25560" }}
        size="small"
        aria-label="edit"
        onClick={onClickEditButton}
      >
        <Edit fontSize="small" />
      </IconButton>
      {onClickDeleteButton && (
        <IconButton
          style={{ color: "#C25560" }}
          size="small"
          aria-label="delete"
          onClick={onClickDeleteButton}
        >
          <Delete fontSize="small" />
        </IconButton>
      )}

      {onClickStarButton && (
        <IconButton
          style={{ color: "#C25560" }}
          size="small"
          aria-label="delete"
          onClick={onClickStarButton}
        >
          {starButtonFeatured && <Star fontSize="small" />}

          {!starButtonFeatured && <StarBorder fontSize="small" />}
        </IconButton>
      )}
    </>
  );
};

export default TableButtons;
