import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

class ButtonModal extends React.Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render () {
        return (
            <div>
                <Button onClick={this.handleOpen} variant="outlined" color="primary">{`${this.props.buttonName}`}</Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    {this.props.content}
                    
                </Modal>
            </div>
        );
    }
}

export default ButtonModal;
