import { cloneElement } from 'react';
import CustomModal from '../CustomModal';

const Modal1 = ({ modalId }: { modalId: string }) => {
  return cloneElement(<CustomModal title="타이틀" modalId={modalId} />);
};

export default Modal1;
