import { FC, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ref as storageRef, uploadBytesResumable, getDownloadURL, } from 'firebase/storage';
import { storage } from '../../../app/firebase';
import React from 'react';


const AddPhotosPage: FC = () => {
    const navigate = useNavigate();
    const [files, setFiles ] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    //Handle user selectiom on (camera or file)
    const onSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if(!selected){
            return;
        }

        const fileArray = Array.from(selected).slice(0, 5);
        setFiles(fileArray);


        const urls = fileArray.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
    };
    
    // Upload to Firebase Storage and URLs
    const uploadAll = async () => {
        setUploading(true);
        const urls: string[] = [];

        for(let i = 0; i < files.length; i++){
            const file = files[i];
            const path = `listings/${Date.now()}_${file.name}`;
            const sRef = storageRef(storage, path);
            const task = uploadBytesResumable(sRef, file);

            await new Promise<void>((resolve, reject) => {
                task.on(
                    'state_changed',
                    () => {},
                    (err) => reject(err),
                    async () => {
                        const downloadURL = await getDownloadURL(task.snapshot.ref);
                        urls.push(downloadURL);
                        resolve();
                    }
                );
            });
        }

        setUploading(false);
        navigate('/listing/details', { state: { photoURLs: urls } });
    };

    return (
    <div className="container preview-grid thumb">
      <h2>Add up to 3 photos</h2>

      {/* Hidden file input */}
      <input
        id="photo-input"
        type="file"
        accept="image/*"
        capture="environment"    
        multiple
        onChange={onSelectFiles}
        style={{ display: 'none' }}
      />

      {/* Trigger button */}
      <button onClick={() => document.getElementById('photo-input')?.click()}>
        + Add photos
      </button>

      {/* Preview thumbnails */}
      <div className="preview-grid">
        {previews.map((src, idx) => (
          <img key={idx} src={src} alt={`preview ${idx}`} className="thumb" />
        ))}
      </div>

      {/* Next */}
      <button
        onClick={uploadAll}
        disabled={files.length === 0 || uploading}
      >
        {uploading ? 'Uploading…' : 'Next'}
      </button>
    </div>

    );
};


export default AddPhotosPage;