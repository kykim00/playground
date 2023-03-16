import { ModalDispatchContext } from '@/provider/ModalContext';
import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

interface ModalProps {
  title: string;
  onConfirm?: () => void;
  onClose?: () => void;
  modalId: string;
}

const CustomModal = ({ title, onConfirm, onClose, modalId }: ModalProps) => {
  const { moveToTop, deleteModal } = useContext(ModalDispatchContext);
  const handleToTop = () => {
    // !isActive
    moveToTop(modalId);
  };

  return (
    // <ModalBackground>
    <Draggable handle=".modal-header" bounds={'parent'} onStart={handleToTop}>
      <ModalContainer>
        <Title className="modal-header">{title}</Title>
        <Button onClick={() => onConfirm?.()}>확인</Button>
        <Button onClick={() => deleteModal(modalId)}>취소</Button>
      </ModalContainer>
    </Draggable>
    // </ModalBackground>
  );
};

export default CustomModal;
const ModalBackground = styled.div`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  z-index: 1000;
`;
const ModalContainer = styled.div`
  position: absolute;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: center;
  cursor: move; /* grab */
`;
const Button = styled.button`
  border: none;
  border-radius: 4px;
  background-color: orangered;
  padding: 20px;
`;
