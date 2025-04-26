// import React, { FC, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Card, { ListingSummary } from '../components/Card';
// import NotificationBanner from '../components/NotificationsBanner';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../../app/firebase';

// const ForYouPage: FC = () => {
//   const navigate = useNavigate();
//   const [listings, setListings] = useState<ListingSummary[]>([]);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'listings'));
//         const fetchedListings: ListingSummary[] = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           title: 'Uploaded Item',                // You can update this if you save titles later!
//           price: 0,                              // Same here — placeholder price for now
//           thumbnailURL: doc.data().photoBase64,  // ✅ Use Base64 from Firestore!
//           category: 'General',                   // Optional placeholder
//           brand: 'No brand'                      // Optional placeholder
//         }));
//         setListings(fetchedListings);
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//       }
//     };

//     fetchListings();
//   }, []);

//   const handleCardClick = (id: string) => {
//     const listing = listings.find(l => l.id === id)!;
//     navigate(`/for-you/listing/${id}`, { state: listing });
//   };

//   return (
//     <div className="container flex-col">
//       <h2 className="center">For You ✨</h2>

//       <NotificationBanner />

//       <div className="form-group">
//         <h3>Latest Listings</h3>
//         <div className="flex-row scroll-row">
//           {listings.map(l => (
//             <Card
//               key={l.id}
//               listing={l}
//               onClick={handleCardClick}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForYouPage;
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

  const onSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const fileArray = Array.from(selected).slice(0, 3);
    setFiles(fileArray);

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  // ✅ Upload handler including title, price, category
  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64String = await resizeImage(file);

        await addDoc(collection(db, 'listings'), {
          photoBase64: base64String,
          title: title || 'Untitled Item',
          price: price || 0,
          category: category || 'Other',
          createdAt: serverTimestamp(),
        });
      }

      navigate('/for-you');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Upload failed: ' + (error as Error).message);
    }

    setUploading(false);
  };

  return (
    <div className="container flex-col">
      <h2>Create New Listing</h2>

      <form onSubmit={handleUpload} className="flex-col">
        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Vintage Hoodie"
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (USD)</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            placeholder="e.g., 49.99"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled>Select category</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Other">Other</option>
          </select>
        </div>

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
          {uploading ? 'Uploading…' : 'Submit Listing'}
        </button>
      </form>
    </div>
  );
};

export default AddPhotosPage;
