import FileSaver from 'file-saver';
import CryptoJS from "crypto-js";

const create_keystore = (password, mnemonic) => {
    const ciphertext = CryptoJS.AES.encrypt(mnemonic, password);
    const blob = new Blob([ciphertext], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "keystore.noah");
};

const decode_keystore = (file, password) => {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = (e) => {
            const wallet = e.target.result;
            const bytes = CryptoJS.AES.decrypt(wallet.toString(), password);
            const plaintext = bytes.toString(CryptoJS.enc.Utf8);
            resolve(plaintext);
        };
        r.readAsText(file);
    })
}
export {create_keystore, decode_keystore}
