import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export default function SimpleModal(props) {

    const { buttonName, content} = props;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" color="primary">{`${buttonName}`}</Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                {content}
                
            </Modal>
        </div>
    );
}