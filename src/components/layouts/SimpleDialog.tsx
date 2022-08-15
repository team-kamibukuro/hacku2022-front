import React, { ReactNode } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@/components/ui-elements/Button";
import { ButtonStyle } from "@/components/ui-elements/Button";

interface Props {
  handleClose: VoidFunction;
  handleClick: VoidFunction;
  open: boolean;
  dialogTitle: string;
  submitTitle: string;
  isDisabled: boolean;
  children?: ReactNode;
}

const SimpleDialog: React.FC<Props> = (props) => {
  const {
    handleClose,
    handleClick,
    open,
    dialogTitle,
    submitTitle,
    isDisabled = false,
    children,
  } = props;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: {},
          className: "nes-dialog is-rounded is-dark",
        }}
      >
        <DialogTitle className="font-press">{dialogTitle}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} buttonStyle={ButtonStyle.isNomal}>
            Cancel
          </Button>
          <Button
            onClick={handleClick}
            buttonStyle={ButtonStyle.isPrimary}
            disabled={isDisabled}
          >
            {submitTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SimpleDialog;
