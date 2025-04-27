// src/features/listings/pages/AddPhotosPage.tsx


import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../app/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import ImagePreviewCarousel from '../../../components/ImagePreviewCarousel';

const AddPhotosPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);


  const handleSelectPhotos = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imagePreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setSelectedImages(imagePreviews);
  };

  const handleAddPhotos = () => {
    if (selectedImages.length > 0) {
      navigate('/listing/uploading', { state: { photoURLs: selectedImages } });
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setSelectedImages([]);
    setShowCancelModal(false);
  };
  
  const closeModal = () => {
    setShowCancelModal(false);
  };
  
  

  return (
    <div className="container flex-col center">
      <div className="flex-row small-text muted-text">
        <span>New Listing &gt; Add Photos</span>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleFilesSelected}
        style={{ display: 'none' }}
      />

      {/* Upload Box */}
      {selectedImages.length === 0 ? (
        <div className="new-listing-box">
          <button onClick={handleSelectPhotos}>+ Add Photos</button>
        </div>
      ) : (
        <>
          {/* Thumbnail Preview */}
          <ImagePreviewCarousel images={selectedImages} />


          {/* Action Buttons */}
          <div className="flex-col center">
            <button onClick={handleAddPhotos}>
              Add {selectedImages.length} Photos
            </button>
            <button onClick={handleCancel} className="btn-muted" style={{ marginTop: '1rem' }}>
              Cancel
            </button>
          </div>
        </>
      )}

{showCancelModal && (
  <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-header">
        <h4>Are you sure?</h4>
        <button onClick={closeModal} className="modal-close">&times;</button>
      </div>
      <div className="modal-body">
        <p>You'll lose your selected photos if you cancel.</p>
      </div>
      <div className="modal-footer">
        <button onClick={confirmCancel} className="btn-delete">Yes, Cancel</button>
        <button onClick={closeModal} className="btn-muted">Keep Editing</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AddPhotosPage;
