import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../store/modalSlice';

function withModalWrapper(Component) {
  return function Modal({ ...props }) {
    const dispatch = useDispatch();
    const { show, type } = useSelector((state) => state.modal);

    const handleClose = () => {
      dispatch(modalActions.closeModal());
    };

    if (!show) {
      return null;
    }

    return (
      <Component {...props} show={show} onHide={handleClose} type={type} />
    );
  };
}

export default withModalWrapper;
