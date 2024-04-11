import React, { useState } from 'react';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';
let result=null
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('audio', selectedFile);
      
      // Replace 'YOUR_API_URL' with your Django backend API endpoint
      const response = await axios.post('http://127.0.0.1:8000/speech/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Assuming your backend returns the uploaded file information
      // response = response.json();
      result=response.data.message
      console.log("-------",response.data.message)
      setUploadedFile(response.data.message);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept=".wav" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload
      </button>
      {
        console.log(typeof(uploadedFile),uploadedFile)
      }
     
        
        <div className="mt-4">
        {uploadedFile === 0 ? "The voice input is Fake" : (uploadedFile == null ? "UPLOAD AUDIO" : "The voice input is Real")}

          {/* <p>{uploadedFile.filename}</p> */}
          {/* Display other information about the uploaded file as needed */}
        </div>
   
    </div>
  );
};

export default FileUpload;
