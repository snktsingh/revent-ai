import CryptoJS from 'crypto-js';

interface IEncryptData {
  data: string;
}

export const secretKey = 'W#p4q^dR8@tG6uF!jK9L7o2w3e1r5yX';

const encryptData = ({ data }: IEncryptData) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};
export default encryptData;
