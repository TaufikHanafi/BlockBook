const db = require(`./db-connection`);
const bcrypt = require(`bcrypt`);
const { ethers } = require("ethers");
const {
    AdminContractInfo,
    PubliserContractInfo, 
    BookContractInfo,
    BookTransactionContractInfo, 
    BookTransactionDetailContractInfo,
    UserContractInfo,
  } = require('./contract');

  
  
function createAdminTable() {
    db.query("CREATE TABLE `admin` (`id` int(11) PRIMARY KEY AUTO_INCREMENT, `nama` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `private_key` varchar(255) NOT NULL);"
        , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

function createUserTable() {
    db.query("CREATE TABLE `user` (`id` int(11) PRIMARY KEY AUTO_INCREMENT, `index` int(11) NOT NULL ,`email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `private_key` varchar(255) NOT NULL);"
        , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    
}

function createPenerbitTable() {
    db.query("CREATE TABLE `penerbit` (`id` int(11) PRIMARY KEY AUTO_INCREMENT, `index` int(11) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `private_key` varchar(255) NOT NULL);"
        , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    
}

function createcartTable() {
    db.query("CREATE TABLE `cart` (`id` int(11) PRIMARY KEY AUTO_INCREMENT,`id_user` int(11) NOT NULL, FOREIGN KEY (`id_user`) REFERENCES user(id), `cart_data` text NOT NULL);"
        , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

function seedAdminTable() {
    let password = bcrypt.hashSync('admin', 10);
    let private_key = '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6';
    db.query("INSERT INTO `admin` (`nama`, `email`, `password`, `private_key`) VALUES ('admin', 'adminblockbook@gmail.com', '"+password+"', '"+private_key+"');"
        , (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });

    const provider = new ethers.JsonRpcProvider('http://localhost:8545');
    const AdminContract = new ethers.Contract(AdminContractInfo.contractAddress, AdminContractInfo.contractABI, provider);
    const wallet = new ethers.Wallet(private_key, provider);
    const AdminContractWithSigner = AdminContract.connect(wallet);

    AdminContractWithSigner.addAdmin(private_key);
}


createAdminTable();
createUserTable();
createPenerbitTable();
createcartTable();
seedAdminTable();