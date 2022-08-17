import React, { ReactNode } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@/components/ui-elements/Button";
import { ButtonStyle } from "@/components/ui-elements/Button";

interface Props {
  handleClick: VoidFunction;
  open: boolean;
  dialogTitle: string;
  submitTitle: string;
  isDisabled?: boolean;
  isNomal?: boolean;
  children?: ReactNode;
  button?: boolean;
}

const DontCloseDialog: React.FC<Props> = (props) => {
  const {
    handleClick,
    open,
    dialogTitle,
    submitTitle,
    isDisabled = false,
    isNomal = false,
    children,
    button = true,
  } = props;

  return (
    <div>
      <Dialog
        onClose={() => {}}
        open={open}
        PaperProps={{
          style: {},
          className: "nes-dialog is-rounded is-dark",
        }}
      >
        <DialogTitle className="font-press m-auto">{dialogTitle}</DialogTitle>
        <DialogContent className="m-auto">{children}</DialogContent>
        {button && (
          <DialogActions className="m-auto">
            <Button
              onClick={handleClick}
              buttonStyle={
                isNomal ? ButtonStyle.isNomal : ButtonStyle.isPrimary
              }
              disabled={isDisabled}
            >
              {submitTitle}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default DontCloseDialog;
