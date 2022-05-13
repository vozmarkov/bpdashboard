import React, { useEffect, useState } from 'react';
import { FileUploader } from 'third-party';

const fileTypes = ['CSV'];

export const Upload = () => {
  const [file, setFile] = useState<
    Array<{
      name: string;
      path: string;
      rows: number;
    }>
  >([]);

  const handleChange = async (file: any) => {
    if (!file) {
      return;
    }
    var resultArray = Object.keys(file).map(function (personNamedIndex: any) {
      return file[personNamedIndex];
    });
    const filesList = resultArray.map((i) => ({
      name: i.name,
      path: i.path,
      rows: 0,
    }));

    for (let index = 0; index < filesList.length; index++) {
      const file = filesList[index];
      const results = await api.uploadEmbDeal(file.path);
      console.log('await results::', results);
      filesList[index].rows = results.length || 0;
    }
    setFile(filesList);
  };
  console.log('state::', file);
  return (
    <div>
      <h1>Emb Report</h1>
      <FileUploader
        multiple
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      {file &&
        file.map((i) => (
          <p key={i.name}>
            {i.name} - total rows loaded: {i.rows}
          </p>
        ))}
    </div>
  );
};
