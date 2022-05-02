import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    content: ReactNode;
    title: string;
    action: ReactNode;
}


const CustomDialog: FC<Props> = (props: Props): JSX.Element => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent>
            <DialogActions>
                {props.action}
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog;