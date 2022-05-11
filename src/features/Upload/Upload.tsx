import React, { useState } from 'react';
import { FileUploader } from 'third-party';

const fileTypes = ['CSV', 'JPG', 'PNG', 'GIF', 'JPEG'];

export const Upload = () => {
  const [file, setFile] = useState(null);
  const handleChange = async (file: any) => {
    console.log('FIILE:::', file);
    setFile(file);
  };
  return (
    <div className="App">
      <h1>Hello To Drag Drop Files</h1>
      <FileUploader
        multiple
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : 'no files uploaded yet'}</p>
    </div>
  );
};
