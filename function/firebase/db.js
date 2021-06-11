const { firestore } = require('./init');
const db = firestore();
const userRef = db.collection('users');
const restoranRef = db.collection('restoran');
const productRef = db.collection('product');

const getDataFromEmail = async (email) => {
    try {
        const snapshot = await userRef.where('email', '==', email).get();
        let count = 1
        let data = {};
        snapshot.forEach(doc => {
            if (count == 1) {
                data = doc.data();
                data.id = doc.id;
                count++;
            }
        });
        return data;
    } catch (error) {
        return { status: false, msg: error }
    }
}

const addData = async (nama, alamat, email, telepon, picture) => {
    try {
        const setIt = await userRef.doc().set({
            nama, alamat, email, telepon, picture
        });
        return { id: setIt.id, nama, alamat, telepon, picture }
    } catch (error) {
        return { status: false, msg: error }
    }
}

const getRestoran = (id) => {
    try {
        let restoranData = {};
        restoranRef.doc(id).get().then(doc => {
            restoranData = doc.data();
            restoranData.id = doc.id;
        });
        return restoranData;
    } catch (error) {
        return { status: false, msg: error }
    }
}

const addRestoran = async (baseNamaRestoran, baseEmail, baseAlamat,
    baseNomor, baseJenisKendaraan, baseFoto) => {
    try {
        const setIt = await restoranRef.doc().set({
            namaRestoran: baseNamaRestoran, email: baseEmail,
            alamat: baseAlamat, nomor: baseNomor, jenisKendaraan: baseJenisKendaraan,
            foto: baseFoto
        });
        return {
            id: setIt.id, namaRestoran: baseNamaRestoran, email: baseEmail,
            alamat: baseAlamat, nomor: baseNomor, jenisKendaraan: baseJenisKendaraan,
            foto: baseFoto
        }
    } catch (error) {
        return { status: false, msg: error }
    }
}

const getProduct = (id) => {
    try {
        let productData = {};
        productRef.doc(id).get().then(doc => {
            productData = doc.data();
            productData.id = doc.id;
        });
        return productData;
    } catch (error) {
        return { status: false, msg: error }
    }
}

const addProduct = async (baseFoto, baseNamaProduk, baseHarga,
    baseDeskripsi, baseTopping, penjualId) => {
    try {
        const setIt = await productRef.doc().set({
            foto: baseFoto, namaProduk: baseNamaProduk,
            harga: baseHarga, deskripsi: baseDeskripsi,
            topping: baseTopping, penjual: penjualId
        });
        return {
            id: setIt.id, foto: baseFoto, namaProduk: baseNamaProduk,
            harga: baseHarga, deskripsi: baseDeskripsi,
            topping: baseTopping, penjual: penjualId
        }
    } catch (error) {
        return { status: false, msg: error }
    }
}

const getMyProducts = async (api_key) => {
    try {
        const snapshot = await productRef.where('penjual', '==', api_key).get();
        let data = [];
        snapshot.forEach(doc => {
            let dataNow = doc.data();
            data.push({ id: doc.id, ...dataNow });
        });
        return data;
    } catch (error) {
        return { status: false, msg: error }
    }
}

module.exports = {
    getDataFromEmail, addData, getRestoran, addRestoran,
    getProduct, addProduct, getMyProducts
}