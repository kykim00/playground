interface ModalOneProps {
  onConfirm?: () => void;
  onClose?: () => void;
}
const ModalOne = ({ onConfirm, onClose }: ModalOneProps) => {
  return (
    <div>
      <h3>모달 1</h3>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default ModalOne;
