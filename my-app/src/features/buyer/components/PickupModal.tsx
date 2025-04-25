import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'react-qr-code';

interface PickupModalProps {
  onClose: () => void;
}

const PickupModal: FC<PickupModalProps> = ({ onClose }) => {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>Pickup Instructions</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>

        <div className="modal-body">
          <p>Please present the following QR code at the pickup location:</p>
          <div className="center">
            <QRCode value={window.location.href} size={128} />
          </div>
          <p>Bring a valid ID matching your account name.</p>
        </div>

        <footer className="modal-footer">
          <button onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default PickupModal;