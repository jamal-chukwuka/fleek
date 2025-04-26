import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../app/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React from 'react';

const AddPhotosPage: FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // New fields:
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');

  // ✅ Resize image helper
  const resizeImage = (file: File, maxWidth = 300): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context is null');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // JPEG at 70% quality
      };

      img.onerror = reject;
    });
  };

  // ✅ File selection handler
  const onSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const fileArray = Array.from(selected).slice(0, 3);
    setFiles(fileArray);

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  // ✅ Upload handler (called on form submit)
  const uploadAll = async () => {
    setUploading(true);
    const photoURLs: string[] = [];  // ✅ Collect here
  
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64String = await resizeImage(file);
  
        await addDoc(collection(db, 'listings'), {
          photoBase64: base64String,
          createdAt: serverTimestamp(),
        });
  
        photoURLs.push(base64String);  // ✅ Collect after uploading
      }
  
      // ✅ Navigate to the next step (PhotoReviewPage expects photoURLs!)
      navigate('/listing/review-photos', { state: { photoURLs } });
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };
  
  

  return (
    <div className="container flex-col">
      <h2>Create New Listing</h2>

      <form onSubmit={(e) => { e.preventDefault(); uploadAll(); }} className="flex-col">
       
        


        {/* Photo Upload */}
        <div className="form-group">
          <label>Upload up to 3 photos</label>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={onSelectFiles}
          />
        </div>

        {/* Previews */}
        <div className="preview-grid">
          {previews.map((src, idx) => (
            <img key={idx} src={src} alt={`preview ${idx}`} className="thumb" />
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={files.length === 0 || uploading}>
          {uploading ? 'Uploading…' : 'Preview you photos'}
        </button> 
      </form>
    </div>
  );
};

export default AddPhotosPage;
