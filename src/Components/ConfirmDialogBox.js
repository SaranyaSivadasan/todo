import React from "react";
import {Button} from "@mui/material";
import {Dialog} from "@mui/material";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";

const ConfirmDialogBox = (props) => {

    return (
        <div>
            <Dialog open={props.open} onRequestClose={props.handleClose} >
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent dividers={true}>
                    <div style={{ display: "flex" }}>
                        <div style={{ paddingLeft: "15px" }} >Are you sure you want to remove this from the list?</div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={props.handleConfirm} >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDialogBox