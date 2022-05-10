import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const BackDrop = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const ModalContent = styled.div`
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 500 !important;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 20px;
  position: absolute;
  right: 20px;
  top: 18px;
  cursor: pointer;
`;

const Modal = ({ isOpen, modalControl, children }) => {
  return (
    isOpen && (
      <BackDrop id="backdrop">
        <ModalContent id="modalContent">
          <CloseIcon onClick={() => modalControl(false)} />
          {children()}
        </ModalContent>
      </BackDrop>
    )
  );
};

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  modalControl: PropTypes.func.isRequired,
};

export default Modal;
