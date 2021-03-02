import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export default function SimpleModal(props) {

    const { buttonName, content} = props;
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>{`${buttonName}`}</Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                {content}
            </Modal>
        </div>
    );
}