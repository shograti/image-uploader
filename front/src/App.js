import axios from 'axios';
import { useState } from 'react';
import uploadImage from './assets/image.svg';
import ProgressBar from './components/ProgressBar';
import UploadSuccess from './components/UploadSuccess';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageLink, setImageLink] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const displayLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 5000);
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
   
      axios.post('http://localhost:3315/upload', data).then((res) => {
        console.log(res.data);
        displayLoading();
        setImageLink(res.data);
      }).catch((error) => {
        setErrorMessage('Image extension should be jpg, jpeg, png or gif');
      }) 
      
    
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <main>
      {isLoading ? (
        <ProgressBar />
      ) : isSuccess ? (
        <UploadSuccess imageLink={imageLink} />
      ) : (
        <form>
          <h2 className="form__title">Upload your image</h2>
          <p className="form__subtitle">File should be Jpeg, PNG, etc.</p>

          <div
            className="drag-and-drop__uploader"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <img src={uploadImage} alt="" />
            <p className="drag-and-drop__text">Drag & Drop your image here</p>
          </div>
          <p className="option__text">Or</p>
          <label htmlFor="uploader__input" className="uploader__button">
            Choose a file
          </label>
          <input
            type="file"
            id="uploader__input"
            onChange={(e) => {
              handleSubmit(e);
            }}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      )}
    </main>
  );
}

export default App;
