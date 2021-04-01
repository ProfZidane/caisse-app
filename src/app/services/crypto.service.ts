import { Injectable } from '@angular/core';
/*import * as Crypto from 'crypto';
import * as CryptoJs from 'crypto-js';*/
import CryptoES from 'crypto-es';
import { SECRET_KEY } from '../../environments/environment';
const encryptionType = 'aes-256-cbc';
const encryptionEncoding = 'base64';
const bufferEncryption = 'utf-8';
declare const Buffer;
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
newValueEncoded;

  constructor() { }


  TextEncodingToAES256(data) {
    if (data !== null && data !== '') {

      let emailEncrypt = CryptoES.AES.encrypt(data.email, SECRET_KEY.AesKey, { iv : CryptoES.enc.Hex.parse(SECRET_KEY.AesIV)});
      console.log(emailEncrypt.toString());

      let emailEncryptBase64 = btoa(emailEncrypt.toString());

      let emailEncodebase64String = atob(emailEncryptBase64);
      let emailDecode = CryptoES.AES.decrypt(emailEncodebase64String, SECRET_KEY.AesKey, { iv : CryptoES.enc.Hex.parse(SECRET_KEY.AesIV)});
      console.log(emailDecode);

      console.log(emailEncryptBase64);
      // console.log(emailEncodebase64String);
     // let emailDecode = Buffer.from(emailEncodebase64String, 'base64').toString('ascii');
     // console.log(emailDecode);


      this.newValueEncoded = {

        // tslint:disable-next-line:max-line-length
        email : emailEncryptBase64,
        // tslint:disable-next-line:max-line-length
        password : CryptoES.enc.Base64.stringify(CryptoES.enc.Base64.parse(CryptoES.AES.encrypt(data.password, SECRET_KEY.AesKey, { iv : CryptoES.enc.Hex.parse(SECRET_KEY.AesIV)}).toString())),
        device : data.device
      };
      console.log(this.newValueEncoded);
      return this.newValueEncoded;
    }
  }

  /*TextDecodingToAES256(data) {
    if (data !== null && data !== '') {
      const decrypted = {
        email : CryptoES.b,
        password : CryptoES.AES.decrypt(data.password, SECRET_KEY.AesKey,  { iv : CryptoES.enc.Hex.parse(SECRET_KEY.AesIV)} )
      };
      console.log(decrypted);
    }
  }*/

  /*TextEncodingToAES256(data) {
    const key = Buffer.from(SECRET_KEY.AesKey, bufferEncryption);
    const iv = Buffer.from(SECRET_KEY.AesIV, bufferEncryption);
    const cipher = Crypto.createCipheriv(encryptionType, key, iv);
    let encrypted = {
      email : cipher.update(data.email, bufferEncryption, encryptionEncoding),
      password : cipher.update(data.password, bufferEncryption, encryptionEncoding)
    };
    encrypted = {
      email :  encrypted.email += cipher.final(encryptionEncoding),
      password : encrypted.password += cipher.final(encryptionEncoding)
    };
    console.log(encrypted);
    this.newValueEncoded = encrypted;
    return this.newValueEncoded;
  }*/


}
