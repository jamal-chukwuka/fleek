// src/features/listings/pages/AddPhotosPage.tsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPhotosPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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
    setSelectedImages([]);
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
          <div className="preview-grid">
            {selectedImages.map((src, idx) => (
              <img key={idx} src={src} className="thumb" alt={`Selected ${idx + 1}`} />
            ))}
          </div>

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
    </div>
  );
};

export default AddPhotosPage;
