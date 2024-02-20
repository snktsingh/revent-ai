import React, { ChangeEvent, useState } from 'react';
import { parse } from 'pptxtojson';
import { useAppDispatch } from '@/redux/store';
import { setPptData } from '@/redux/reducers/theme';

const ConversionToJson: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null); // Adjust type as per your JSON structure
  const dispatch = useAppDispatch();
  const options = {
    slideFactor: 75 / 914400,
    fontsizeFactor: 100 / 96,
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const jsonData = await readFile(file);
      setJsonData(jsonData);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const readFile = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          const json = await parse(e.target?.result as ArrayBuffer, options);
          console.log(json);
          dispatch(setPptData(json));

          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = e => {
        reject(new Error('Error reading file.'));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default ConversionToJson;
