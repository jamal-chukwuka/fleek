import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { Star } from 'lucide-react';

interface RatingModalProps {
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const RatingModal: FC<RatingModalProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onSubmit(rating);
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h3>Rate Your Purchase</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </header>

        <div className="modal-body">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(n => (
              <Star
                key={n}
                className={n <= rating ? 'star filled' : 'star'}
                onClick={() => setRating(n)}
                role="button"
                tabIndex={0}
                onKeyPress={e => e.key === 'Enter' && setRating(n)}
              />
            ))}
          </div>
        </div>

        <footer className="modal-footer">
          <button onClick={handleSubmit} disabled={rating === 0}>
            Submit
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default RatingModal;