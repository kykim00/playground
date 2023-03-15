import CustomModal from '../CustomModal';

const Modal1 = ({ onClose }: { onClose: () => void }) => {
  return <CustomModal title="타이틀" onClose={onClose} />;
};

export default Modal1;
