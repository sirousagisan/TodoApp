import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const CustomModal = ({ buttonLabel, children }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        {buttonLabel}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-xl">
            <h2 id="modal-modal-title" className="text-2xl mb-4">
              Modal Title
            </h2>
            <div id="modal-modal-description">{children}</div>
            <div className="mt-4">
              <Button onClick={handleClose} variant="contained">
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
