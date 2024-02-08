import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { FaRegWindowClose } from "react-icons/fa";
import { useContext } from 'react';
import { ModalContext } from "../../components/contexts/ModalContext"


const CustomModal = ({ children, header, context }) => {
  const [open, setOpen] = useContext(context)
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen} className=' border border-gray-200 rounded-md text-blue-200 px-6 py-2 mr-2'>
      {header=="Edit Todo" ? <FaPenToSquare /> : <FaRegTrashCan />}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=''
      >
        <div className="fixed inset-0 flex items-center justify-center min-w-80">
          <div className="border border-blue-200 bg-slate-700 p-8 max-w-md mx-auto rounded-lg shadow-xl">
            <div className='flex items-center justify-between mb-4'>
              <h2 id="modal-modal-title" className="text-2xl text-blue-200">
                { header }
              </h2>
              <button className="text-blue-200 text-3xl" onClick={handleClose}>
                <FaRegWindowClose />
              </button>
            </div>
            <div id="modal-modal-description">
              {/* { newChildren } */}
              {children}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
