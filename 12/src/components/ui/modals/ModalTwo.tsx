import styled from '@emotion/styled';

interface ModalOneProps {
  onConfirm?: () => void;
  onClose?: () => void;
}
const ModalTwo = ({ onConfirm, onClose }: ModalOneProps) => {
  return (
    <ModalContainer>
      <h3>모달 2</h3>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onClose}>닫기</button>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 40%;
  width: 500px;
  height: 300px;
  background-color: olivedrab;
  border: 3px solid #aaa;
`;
export default ModalTwo;
