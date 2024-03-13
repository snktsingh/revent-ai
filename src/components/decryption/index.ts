import CryptoJS from 'crypto-js';
import { secretKey } from '../encryption';
import { tempToken } from '@/utils/localStorage/data';

const DecryptData = () => {
  if (tempToken === null || tempToken === '') {
    return null;
  } else {
    const bytes = CryptoJS.AES.decrypt(tempToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedToken);
  }
};

export default DecryptData;
