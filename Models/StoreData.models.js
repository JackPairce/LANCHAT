const Store = require("electron-store");
const CryptoJS = require("crypto-js");
const store = new Store();
const KEY = "ThisISMyKey";

const CryptData = (data) => {
  return CryptoJS.AES.encrypt(data, KEY).toString();
};
const DecryptData = (data) => {
  return CryptoJS.AES.decrypt(data, KEY).toString(CryptoJS.enc.Utf8);
};

exports.Save = (name, data) => store.set(name, CryptData(data));

exports.Read = (name) => {
  let Data = store.get(name);
  if (Data) return DecryptData(Data);
  return null;
};

exports.Delete = (name) => store.delete(name);
