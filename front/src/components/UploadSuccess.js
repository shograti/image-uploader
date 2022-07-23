import './UploadSuccess.css';
import successImage from '../assets/success.svg';
import { useState } from 'react';

function UploadSuccess({ imageLink }) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="upload-success-container">
      <img className="success-icon" src={successImage} alt="" />
      <p>Uploaded Successfully!</p>
      <div className="image-preview">
        <img src={`http://localhost:3315/uploads/${imageLink}`} alt="" />
      </div>
      <div className="image-link">
        <input
          type="text"
          defaultValue={`http://localhost:3315/uploads/${imageLink}`}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `http://localhost:3315/uploads/${imageLink}`
            );
            setIsCopied(true);
          }}
        >
          {!isCopied ? 'Copy Link' : 'Copied !'}
        </button>
      </div>
    </div>
  );
}

export default UploadSuccess;
