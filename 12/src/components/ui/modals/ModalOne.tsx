import styled from '@emotion/styled';

interface ModalOneProps {
  onConfirm?: () => void;
  onClose?: () => void;
}
const ModalOne = ({ onConfirm, onClose }: ModalOneProps) => {
  return (
    <ModalContainer>
      <h3>모달 1</h3>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onClose}>닫기</button>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 25%;
  width: 500px;
  height: 300px;
  background-color: cyan;
  border: 3px solid #aaa;
`;
export default ModalOne;
