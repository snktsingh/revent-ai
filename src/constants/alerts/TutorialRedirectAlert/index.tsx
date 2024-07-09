import { ROUTES } from "@/constants/endpoint";
import { toggleTutorialRedirectALert } from "@/redux/reducers/elements";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";



export const TutorialRedirectAlert = () => {

    const { openTutorialRedirectAlert } = useAppSelector( state => state.element);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleTutorialRedirectALert(false));
    }

    const handleRedirect = () => {
        handleClose();
        window.location.href = ROUTES.TUTORIALS;
    }

    return <>
        <Dialog
            open={openTutorialRedirectAlert}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to visit the Tutorials page?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You will be redirected to the Tutorials page.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '0 1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel control={<Checkbox />} label="Don't show this again" />
                </div>
                <div>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRedirect} autoFocus>
                        Visit Tutorials
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    </>;
}