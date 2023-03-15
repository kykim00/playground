import styled from '@emotion/styled';

interface ModalProps {
  title: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

const CustomModal = ({ title, onConfirm, onClose }: ModalProps) => {
  return (
    // <ModalBackground>
    <ModalContainer>
      <Title>{title}</Title>
      <Button onClick={() => onConfirm?.()}>확인</Button>
      <Button onClick={() => onClose?.()}>취소</Button>
    </ModalContainer>
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
`;
const Button = styled.button`
  border: none;
  border-radius: 4px;
  background-color: orangered;
  padding: 20px;
`;
