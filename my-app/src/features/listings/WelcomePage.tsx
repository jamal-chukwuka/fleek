// import React from 'react';
// import { FC } from 'react';
// import { useNavigate } from 'react-router-dom';

// const WelcomePage: FC = () => {
//     const navigate = useNavigate();

//     const handleCreate = () => {
//         navigate('/listing/photos');
//     }


// return (
//     <div className='container center flex-col'>
//         <h1>Welcome, Seller!</h1>
//         <p>{}</p>
//         <button onClick={handleCreate}>
//             Create new listing!
//         </button>
//     </div>

//     );
// };

// export default WelcomePage;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex-col center">
      {/* Top Bar */}
      <header className="top-bar flex-row space-between">
        <div className="logo">[Logo]</div>
        <div className="hamburger">
          <span>☰</span>
        </div>
      </header>

      {/* Welcome Message */}
      <h2>Welcome, Neha!</h2>

      {/* Create New Listing Box */}
      <div 
        className="new-listing-box" 
        onClick={() => navigate('/listing/photos')}
      >
        <p>Create new listing</p>
        <p>+</p>
      </div>

      {/* Bottom Navigation */}
      <footer className="bottom-nav flex-row center">
        <button onClick={() => navigate('/for-you')}>✨ For You</button>
        <button className="active">+ New listing</button>
        <button>🔍 Search</button>
      </footer>
    </div>
  );
};

export default WelcomePage;
