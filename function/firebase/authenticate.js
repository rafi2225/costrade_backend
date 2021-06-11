const { auth } = require('./init');
const { getDataFromEmail, addData } = require('./db');

const login = (baseEmail, password) => {
    baseEmail = baseEmail.trim().toLowerCase();
    let data = {};
    auth().signInWithEmailAndPassword(baseEmail, password)
        .then(async () => {
            const getIt = await getDataFromEmail(baseEmail);
            const { nama, email, alamat, telepon, id } = getIt;
            data = { api_key: id, nama, email, alamt, telepon }
        })
        .catch(err => ({ status: false, msg: err.message }));
    return data;
}

const register = (baseNama, baseAlamat, baseTelepon, basePicture, baseEmail, basePassword) => {
    baseEmail = baseEmail.trim().toLowerCase();
    let data = {};
    auth().createUserWithEmailAndPassword(baseEmail, basePassword)
        .then(async () => {
            const addIt = await addData(baseNama, baseAlamat, baseEmail, baseTelepon, basePicture);
            const { id, nama, alamat, telepon, picture } = addIt
            data = { api_key: id, nama, alamat, telepon, picture };
        })
        .catch(err => ({ status: false, msg: err.message }));
    return data;
}

module.exports = { login, register }