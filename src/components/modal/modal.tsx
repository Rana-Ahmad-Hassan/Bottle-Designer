import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2">{message}</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
