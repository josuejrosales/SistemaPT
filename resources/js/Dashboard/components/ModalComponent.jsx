import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyleDialog = styled(Dialog)((theme) => ({
    [`&.visible div[aria-describedby='${theme["aria-describedby"]}']`]: {
        overflow: "initial"
    }
}))

function ModalComponent({ Title = null, open, onClose, alias = 'root', overflow = 'initial', onExited, actions = () => { }, children }) {

    return (
        <StyleDialog
            className={overflow}
            TransitionProps={{ onExited }}
            open={open}
            onClose={() => onClose(false)}
            aria-describedby={alias}
            aria-labelledby="alert-dialog-title">
            <DialogTitle>
                {Title && <Title />}
            </DialogTitle>
            <DialogContent sx={{ overflow }}>
                {children}
            </DialogContent>
            <DialogActions>
                {actions()}
                <Button onClick={() => onClose(false)} sx={{ color: "gray" }}>Cerrar</Button>
            </DialogActions>

        </StyleDialog>
    );
}

ModalComponent.propTypes = {
    Title: PropTypes.elementType,
    Actions: PropTypes.elementType,
};

export default ModalComponent;