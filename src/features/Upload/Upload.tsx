import React, { useState } from 'react';
import { FileLoader } from 'components';
import { Box } from 'third-party';
import { Reports } from 'types/common';

export const Upload = () => {
  const [file, setFile] = useState<
    Array<{
      name: string;
      path: string;
      rows: number | any;
    }>
  >([]);

  const handleUpload = async (file: any, type: Reports) => {
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
      let results;
      if (type === Reports.emb) {
        results = await api.uploadEmbDeal(file.path);
      } else if (type === Reports.AzOrdersShipment) {
        results = await api.uploadAzOrdersShipment(file.path);
      }
      console.log('UPLOAD RESULTS:::', results);
      filesList[index].rows = results.length || 0;
    }
    setFile(filesList);
  };

  // uploadAzOrdersShipment
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FileLoader
          name="Emb Report"
          file={file}
          handleChange={(file) => handleUpload(file, Reports.emb)}
        />
        <FileLoader
          name="AZ Orders and shipments"
          file={file}
          handleChange={(file) => handleUpload(file, Reports.AzOrdersShipment)}
        />
        {/* <FileLoader name="AZ Items" file={file} handleChange={handleChange} /> */}
        {/* <FileLoader name="AZ Refunds" file={file} handleChange={handleChange} />
        <FileLoader name="AZ Returns" file={file} handleChange={handleChange} /> */}
      </Box>
    </>
  );
};
