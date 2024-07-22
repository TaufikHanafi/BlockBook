const express = require('express');
const db = require('./db-connection');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const fs = require('fs');
const admin = require('firebase-admin');
const serviceAccount = require('./blockbook-assets/blockbook-storage-firebase-adminsdk-lq9op-3bcb2b73a4.json');
const { ethers } = require("ethers");
const {
  AdminContractInfo,
  PubliserContractInfo, 
  UserContractInfo,
  BookContractInfo,
  BookTransactionContractInfo, 
} = require('./contract');
const { Transaction } = require('ethers');
const { InvalidSignatureError } = require('web3');

BigInt.prototype.toJSON = function() { return this.toString() }





/*----------------------------------*/
/*MANAGEMENT WEB3*/
/*----------------------------------*/
// Set up a provider pointing to your local Ethereum node
const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const AdminContract = new ethers.Contract(AdminContractInfo.contractAddress, AdminContractInfo.contractABI, provider);
const PubliserContract = new ethers.Contract(PubliserContractInfo.contractAddress, PubliserContractInfo.contractABI, provider);
const BookContract = new ethers.Contract(BookContractInfo.contractAddress, BookContractInfo.contractABI, provider);
const UserContract = new ethers.Contract(UserContractInfo.contractAddress, UserContractInfo.contractABI, provider);
const BookTransactionContract = new ethers.Contract(BookTransactionContractInfo.contractAddress, BookTransactionContractInfo.contractABI, provider);

// Multer storage setup for handling form data
const storage = multer.memoryStorage();
const upload = multer({ storage });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'blockbook-storage.appspot.com' 
});

const bucket = admin.storage().bucket();

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));





/*----------------------------------*/
/*MANAGEMENT STATIC FOLDER*/
/*----------------------------------*/

/*STATIC FOLDER*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('blockbook-assets'));
app.use(express.static(path.join(__dirname, 'blockbook-assets')));
app.use('/css', express.static(path.join(__dirname, 'blockbook-assets/css')));
app.use('/image', express.static(path.join(__dirname, 'blockbook-assets/image')));
app.use('/js', express.static(path.join(__dirname, 'blockbook-assets/js')));
app.use('/book', express.static(path.join(__dirname, 'blockbook-assets/book')));
app.use('/imagebook', express.static(path.join(__dirname, 'blockbook-assets/book/image')));
app.use('/pdfbook', express.static(path.join(__dirname, 'blockbook-assets/book/pdf')));

// Log each request for debugging
app.use((req, res, next) => {
  console.log(`Request for: ${req.url}`);
  next();
});





/*----------------------------------*/
/*MANAGEMENT SESSION*/
/*----------------------------------*/

/*SESSION SETUP*/
app.use(session({
  secret: 'blockbook-awesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // pastikan secure: true jika menggunakan HTTPS
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});





/*----------------------------------*/
/*MANAGEMENT MIDDLEWARE*/
/*----------------------------------*/

/*MIDDLEWARE AUTHORIZATION*/
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.loggedIn) {
      return next();
  } else {
      res.redirect('/login');
  }
}

function ensureRole(role) {
  return function (req, res, next) {
    if (req.session.role === role) {
      return next();
    }
    req.flash('error_msg', 'You do not have permission to view this resource');
    res.redirect('/login');
  };
}





/*----------------------------------*/
/*MANAGEMENT DEKLARASI PAGE*/
/*----------------------------------*/

/*DEKLARASI PAGE*/
app.get('/', (req, res) => {
  res.render('dashboard');
});

app.get('/about', ensureAuthenticated, (req, res) => {
  res.render('user/aboutus', {user: req.session.user});
});

app.get('/contact', ensureAuthenticated, (req, res) => {
  res.render('user/contact', {user: req.session.user});
});

app.get('/publikasi', ensureAuthenticated, ensureRole('penerbit'), (req, res) => {
  res.render('publikasi/publikasi', {user: req.session.user});
});

app.get('/admin', ensureAuthenticated, ensureRole('admin'), (req, res) => {
  res.render('admin/admin', {user: req.session.user});
});

app.get('/login', (req, res) => {
  res.render('login/login_page');
});

app.get('/registeruser', (req, res) => {
  res.render('login/register');
});

app.get('/registerpenerbit', (req, res) => {
  res.render('login/registerpenerbit');
});

app.get('/dashboarduser', ensureAuthenticated, (req, res) => {
  res.render('user/dashboard_user', {user: req.session.user});
});

app.get('/profil', ensureAuthenticated, ensureRole('penerbit'), (req, res) => {
  res.render('editprofil', {user: req.session.user});
});





/*----------------------------------*/
/*MANAGEMENT TAMPILAN BUKU*/
/*----------------------------------*/

//databuku route
app.get('/databuku', ensureAuthenticated, ensureRole('admin'), async (req, res) => {
  const books = await BookContract.getAllBooksWithRelation();

  const booksWithRelation = Array.from(books).map(book => {
    total_terjual =0;
    total_keuntungan =0;
    total_keuntungan_Admin =0;

    Array.from(book.transaction).forEach(transaction => {
    })


    return book;
  });

  res.render('admin/databuku', { 
    books: booksWithRelation, 
    user: req.session.user 
  });
});



app.get('/chartadmin', ensureAuthenticated, ensureRole('admin'), async (req, res) => {
  const sql = `
      SELECT b.judul_buku AS name, SUM(td.quantity) AS sold
      FROM buku b
      JOIN transaction_details td ON b.id_buku = td.book_id
      WHERE b.is_visible = TRUE
      GROUP BY b.id_buku`;

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching sales data:', err.stack);
          return res.status(500).send('Error fetching sales data');
      }
      res.json(results);
  });
});



app.get('/shop', ensureAuthenticated, async (req, res) => {
  const publiserId = req.session.user.id;
  console.log('Publiser ID:', publiserId);
  try {

      const books = await BookContract.getAllVisibleBooks(); 
      
      const BookVisible = Array.from(books).map(book => {
          return book;
      });

      res.render('user/shop', {
          books: BookVisible,
          user: req.session.user
      });
  } catch (error) {
      console.error('Failed to load books or publishers:', error);
      res.status(500).send('Failed to load data from blockchain.');
  }
});






/*----------------------------------*/
/*MANAGEMENT LOGIN DAN REGISTER*/
/*----------------------------------*/

// Registration for user
app.post('/registeruser', async (req, res) => {
  const { nama_user, email, password, private_key } = req.body;
  console.log("Original password:", password); 

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword); 

  const signer = new ethers.Wallet(private_key, provider);
  const UserContractWithSigner = UserContract.connect(signer);

  UserContractWithSigner.once('UserAdded', function(indexUser){
    const sql = 'INSERT INTO user (`index`, email, `password`, private_key) VALUES (?, ?, ?, ?)';
    db.query(sql, [indexUser, email, hashedPassword, private_key], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err.stack);
        return res.status(500).send('Error registering user');
      }
      res.redirect('/login');
    });
  });

  const response = await UserContractWithSigner.addUser(nama_user, email, password);
  await response.wait();
});


// Registration for publisher
app.post('/registerpenerbit', upload.fields([
  { name: 'identitas', maxCount: 1 }
]), async (req, res) => {
  const { nama_penerbit, email, password, bank_id, private_key } = req.body;
  const { identitas } = req.files;
  console.log("Original password:", password); 

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword); 

  if (!identitas) {
    throw new Error('Identitas not found');
  }

  const identitasBuffer = identitas[0].buffer;
  const identitasBase64Data = encodeToBase64(identitasBuffer);
  const shuffledIdentitasBase64Data = shuffleBase64(identitasBase64Data); 
  const identitasUrl = await uploadBase64FileToFirebase(identitas[0].originalname, shuffledIdentitasBase64Data);

  const signer = new ethers.Wallet(private_key, provider);
  const PubliserContractWithSigner = PubliserContract.connect(signer);

  PubliserContractWithSigner.once('PubliserAdded', function(indexPubliser){
    const sql = 'INSERT INTO penerbit(`index`, email, `password`, private_key) VALUES (?, ?, ?, ?)';
    db.query(sql, [indexPubliser, email, hashedPassword, private_key], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err.stack);
        return res.status(500).send('Error registering user');
      }
      res.redirect('/login');
    });
  });

  const response = await PubliserContractWithSigner.addPubliser(nama_penerbit, email, identitasUrl, parseInt(bank_id), password);
  await response.wait();
});


/*LOGIN SECTION*/
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sqlAdmin = 'SELECT * FROM admin WHERE email = ?';
  db.query(sqlAdmin, [email], async (err, results) => {
    if (err) {
      console.error('Error querying data:', err.stack);
      return res.status(500).send('Error logging in');
    }
    if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
      req.session.loggedIn = true;
      req.session.role = 'admin';
      req.session.user = {
        id: results[0].id,
        name: results[0].nama,
        private_key: results[0].private_key,
      };
      return res.redirect('/admin');
    } else {
      loginPenerbit();
    }
  });

  function loginPenerbit() {
    const sqlPenerbit = 'SELECT id, password FROM penerbit WHERE email = ?';
    db.query(sqlPenerbit, [email], async (errPenerbit, resultsPenerbit) => {
      if (errPenerbit) {
        console.error('Error querying data:', errPenerbit.stack);
        return res.status(500).send('Error logging in');
      }
      if (resultsPenerbit.length > 0 && await bcrypt.compare(password, resultsPenerbit[0].password)) {
        req.session.loggedIn = true;
        req.session.role = 'penerbit';
        req.session.user = {
          id: resultsPenerbit[0].id,
          name: resultsPenerbit[0].name,
          private_key: resultsPenerbit[0].private_key,
        };
        return res.redirect('/publikasi');
      } else {
        loginUser();
      }
    });
  }

  function loginUser() {
    const sqlUser = 'SELECT id, password FROM user WHERE email = ?';
    db.query(sqlUser, [email], async (errUser, resultsUser) => {
        if (errUser) {
            console.error('Error querying data:', errUser.stack);
            return res.status(500).send('Error logging in');
        }
        if (resultsUser.length > 0 && await bcrypt.compare(password, resultsUser[0].password)) {
            req.session.loggedIn = true;
            req.session.role = 'user'; 
            req.session.user = {
                id: resultsUser[0].id,
                name: resultsUser[0].nama,
                private_key: resultsUser[0].private_key,
            };
            return res.redirect('/dashboarduser');
        } else {
          req.flash('error_msg', 'Error logging in');
          return res.redirect('/login');
        }
    });
}
});

app.get('/logout', (req, res) => {
  req.flash('success_msg', 'Logout successful');  // Set flash message
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/login');
  });
});





/*----------------------------------*/
/*MANAGEMENT ENKRIPSI*/
/*----------------------------------*/

function encodeToBase64(data) {
  return data.toString('base64');
}

async function uploadFileToFirebase(file) {
  const { originalname, buffer, mimetype } = file;

  if (mimetype === 'application/pdf') {
      const base64Data = encodeToBase64(buffer);
      const blob = bucket.file(`${originalname}.base64`);
      const blobStream = blob.createWriteStream({
          resumable: false,
          contentType: 'text/plain'
      });

      return new Promise((resolve, reject) => {
          blobStream.on('finish', async () => {
              await blob.makePublic();
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              resolve(publicUrl);
          });

          blobStream.on('error', (err) => {
              reject(err);
          });

          blobStream.end(Buffer.from(base64Data, 'utf8'));
      });
  } else if (mimetype === 'image/png') {
      const blob = bucket.file(originalname);
      const blobStream = blob.createWriteStream({
          resumable: false,
          contentType: mimetype
      });

      return new Promise((resolve, reject) => {
          blobStream.on('finish', async () => {
              await blob.makePublic();
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              resolve(publicUrl);
          });

          blobStream.on('error', (err) => {
              reject(err);
          });

          blobStream.end(buffer);
      });
  } else {
      throw new Error('Unsupported file type');
  }
}

async function uploadBase64FileToFirebase(filename, base64Data) {
  const blob = bucket.file(`${filename}.base64`);
  const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: 'text/plain'
  });

  return new Promise((resolve, reject) => {
      blobStream.on('finish', async () => {
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl);
      });

      blobStream.on('error', (err) => {
          reject(err);
      });

      blobStream.end(Buffer.from(base64Data, 'utf8'));
  });
}

function shuffleBase64(base64Data) {
  const halfLength = base64Data.length / 2;
  const modResult = Math.floor(halfLength) % 3;
  let shuffled = base64Data.split('');

  if (modResult === 0) {
      // Shuffle pattern 2
      for (let i = 0; i < shuffled.length; i += 2) {
          if (i + 1 < shuffled.length) {
              let temp = shuffled[i];
              shuffled[i] = shuffled[i + 1];
              shuffled[i + 1] = temp;
          }
      }
  } else if (modResult === 1) {
      // Shuffle pattern 1 and 0
      for (let i = 0; i < shuffled.length; i += 3) {
          if (i + 2 < shuffled.length) {
              let temp = shuffled[i];
              shuffled[i] = shuffled[i + 1];
              shuffled[i + 1] = shuffled[i + 2];
              shuffled[i + 2] = temp;
          }
      }
  } else {
      // Shuffle pattern 1
      for (let i = 0; i < shuffled.length; i += 2) {
          if (i + 1 < shuffled.length) {
              let temp = shuffled[i];
              shuffled[i] = shuffled[i + 1];
              shuffled[i + 1] = temp;
          }
      }
  }
  return shuffled.join('');
}

function deshuffleBase64(shuffledData) {
  const halfLength = shuffledData.length / 2;
  const modResult = Math.floor(halfLength) % 3;
  let deshuffled = shuffledData.split('');

  if (modResult === 0) {
      // Reverse pattern 2
      for (let i = 0; i < deshuffled.length; i += 2) {
          if (i + 1 < deshuffled.length) {
              let temp = deshuffled[i];
              deshuffled[i] = deshuffled[i + 1];
              deshuffled[i + 1] = temp;
          }
      }
  } else if (modResult === 1) {
      // Reverse pattern 1 and 0
      for (let i = deshuffled.length - 3; i >= 0; i -= 3) {
          if (i + 2 < deshuffled.length) {
              let temp = deshuffled[i + 2];
              deshuffled[i + 2] = deshuffled[i + 1];
              deshuffled[i + 1] = deshuffled[i];
              deshuffled[i] = temp;
          }
      }
  } else {
      // Reverse pattern 1
      for (let i = 0; i < deshuffled.length; i += 2) {
          if (i + 1 < deshuffled.length) {
              let temp = deshuffled[i];
              deshuffled[i] = deshuffled[i + 1];
              deshuffled[i + 1] = temp;
          }
      }
  }
  return deshuffled.join('');
}

function calculateChecksum(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

app.get('/download-file', async (req, res) => {

  try {
      
      const filePath = req.query.path;

      if (!filePath) {
          return res.status(400).send('File path is required.');
      }

      const fileName = decodeURIComponent(filePath.split('/').pop());
      const encodedFileName = encodeURIComponent(fileName);
      const file = bucket.file(encodedFileName);

      const [exists] = await file.exists();
      if (!exists) {
          return res.status(404).send('File not found in Firebase Storage.');
      }

      const fileContentsBuffer = await file.download();
      const fileContents = fileContentsBuffer.toString('utf8');

      const decodedContent = Buffer.from(fileContents, 'base64');

      const calculatedChecksum = calculateChecksum(decodedContent);

      res.setHeader('Content-Disposition', 'attachment; filename=' + fileName.replace('.base64', ''));
      res.setHeader('Content-Type', 'application/pdf');
      res.send(decodedContent);
  } catch (error) {
      console.error('Error downloading or decoding file:', error);
      res.status(500).send('Failed to download or decode file.');
  }
});

app.get('/download-fileidentitas', async (req, res) => {
  const fullPath = req.query.path;
  console.log("Full URL provided:", fullPath);

  const pathRegex = /blockbook-storage\.appspot\.com\/(.+)$/;
  const match = fullPath.match(pathRegex);

  if (!match) {
    console.error("Invalid file path provided.");
    return res.status(400).send('Invalid file path format.');
  }

  try {

    const firebasePath = decodeURIComponent(match[1]);
    console.log("Decoded Firebase path:", firebasePath);

    const file = bucket.file(firebasePath);
    const [exists] = await file.exists();

    if (!exists) {
      console.log("File not found in Firebase using path:", firebasePath);
      return res.status(404).send('File not found in Firebase Storage.');
    }

    const fileContentsBuffer = await file.download();
    console.log("File downloaded, size:", fileContentsBuffer.length);

    const fileContents = fileContentsBuffer.toString('utf8');
    const deshuffledContent = deshuffleBase64(fileContents);

    const decodedContent = Buffer.from(deshuffledContent, 'base64');

    const fileName = firebasePath.split('/').pop().replace('.base64', '');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(decodedContent);
  } catch (error) {
    console.error('Error during file download or processing:', error);
    res.status(500).send('Failed to download or decode file.');
  }
});






/*----------------------------------*/
/*MANAGEMENT PUBLIKASI BUKU*/
/*----------------------------------*/

/*Publikasi Buku*/
app.post('/publikasi', upload.fields([
  { name: 'gambar_buku', maxCount: 1 },
  { name: 'EBook', maxCount: 1 }
]), async (req, res) => {
  const { judul_buku, penulis_buku, harga_buku, ISBN, bahasa, lembar_print} = req.body;
  const { gambar_buku, EBook } = req.files;
  const idPenerbit = req.session.user.id;

  try {
      const gambarBukuUrl = gambar_buku ? await uploadFileToFirebase(gambar_buku[0]) : '';
      let ebookUrl = '';
      let ebookChecksum = '';

      if (EBook) {
          // Handle EBook
          const ebookBuffer = EBook[0].buffer;
          const ebookBase64Data = encodeToBase64(ebookBuffer);
          ebookChecksum = crypto.createHash('sha256').update(ebookBuffer).digest('hex');
          ebookUrl = await uploadBase64FileToFirebase(EBook[0].originalname, ebookBase64Data);
      }

      const privateKeyQuery = 'SELECT private_key, `index` FROM penerbit WHERE id = ?';
      const result = await new Promise((resolve, reject) => {
          db.query(privateKeyQuery, [idPenerbit], (err, results) => {
              if (err) reject(err);
              else if (results.length > 0) resolve(results[0]);
              else reject(new Error('Publisher not found'));
          });
      });

      const wallet = new ethers.Wallet(result.private_key, provider);
      const bookContractWithSigner = BookContract.connect(wallet);


      bookContractWithSigner.once('BookAdded', async (bookIndex) => {
        res.redirect('/publikasi');
      });

      const response = await bookContractWithSigner.addBook(
          ISBN, judul_buku, penulis_buku, result.index, ebookChecksum, harga_buku, gambarBukuUrl, ebookUrl, bahasa, lembar_print
      );

      await response.wait();
  } catch (error) {
      console.error('Error in publication process:', error);
      res.status(500).send('Failed to publish book');
  }
});





/*----------------------------------*/
/*MANAGEMENT BUKU*/
/*----------------------------------*/

/*HAPUS BUKU*/
app.post('/delete_book', ensureAuthenticated, ensureRole('admin'), async (req, res) => {
  const { id_buku} = req.body;  

  if (!id_buku ){
    return res.status(400).send('Book ID and Access Key are required.');
  }

  try {
    const adminPrivateKey = req.session.user.private_key;  
    const adminWallet = new ethers.Wallet(adminPrivateKey, provider);

    const BookContractWithSigner = BookContract.connect(adminWallet);

    const deleteTx = await BookContractWithSigner.deleteBook(id_buku, adminPrivateKey);

    await deleteTx.wait();

    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).send('Failed to delete book');
  }
});



/*UPDATE VISIBILITY BUKU*/
app.post('/update_visibility', ensureAuthenticated, ensureRole('admin'), async (req, res) => {
  const { id_buku, visible } = req.body;
  try {
      const adminPrivateKey = req.session.user.private_key;
      const adminWallet = new ethers.Wallet(adminPrivateKey, provider);
      const BookContractWithSigner = BookContract.connect(adminWallet);

      const setVisibleTx = await BookContractWithSigner.setVisible(id_buku, visible === 'on', adminPrivateKey);

      await setVisibleTx.wait();
      res.redirect('/databuku');
  } catch (error) {
      console.error('Error updating book visibility:', error);
      res.status(500).send('Failed to update book visibility');
  }
});






/*----------------------------------*/
/*MANAGEMENT KERANJANG*/
/*----------------------------------*/

/*KERANJANG SECTION*/
app.post('/cart', ensureAuthenticated, (req, res) => {
  const userId = req.session.user.id;
  const cartData = req.body.cart;

  if (!userId) {
      console.error('User ID is not available in session');
      return res.status(400).send('Session error: User ID is missing');
  }

  console.log('Saving cart data for user:', userId, cartData);

  const sqlSelect = 'SELECT id FROM cart WHERE id_user = ?';
  db.query(sqlSelect, [userId], (err, results) => {
      if (err) {
          console.error('Error querying cart data:', err.stack);
          return res.status(500).send('Error querying cart data');
      }

      const cartActionSQL = results.length > 0 ?
          'UPDATE cart SET cart_data = ? WHERE id_user = ?' :
          'INSERT INTO cart (id_user, cart_data) VALUES (?, ?)';

      const params = results.length > 0 ? [JSON.stringify(cartData), userId] : [userId, JSON.stringify(cartData)];

      db.query(cartActionSQL, params, (error) => {
          if (error) {
              console.error('Error saving cart data:', error.stack);
              return res.status(500).send('Error saving cart data');
          }
          req.session.cart = Array.isArray(cartData) ? cartData : [cartData];
          res.json({ success: true });
      });
  });
});



app.get('/cart', ensureAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  if (!userId) {
    console.error('User ID is not available in session');
    return res.status(400).send('Session error: User ID is missing');
  }

  console.log('Loading cart data for user:', userId);

  const sql = 'SELECT cart_data FROM cart WHERE id_user = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart data:', err.stack);
      return res.status(500).send('Error fetching cart data');
    }
    const cartData = results.length > 0 ? JSON.parse(results[0].cart_data) : [];
    req.session.cart = Array.isArray(cartData) ? cartData : [cartData];
    res.json({ cart: cartData });
  });
});






/*----------------------------------*/
/*MANAGEMENT KERANJANG CHECKOUT*/
/*----------------------------------*/

app.post('/checkout', ensureAuthenticated, (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  req.session.checkedOutCart = cart; 
  req.session.cart = [];  

  req.session.save(err => {
      if (err) {
          console.error('Error saving session:', err);
          return res.status(500).json({ success: false, message: 'Failed to save session' });
      }
      res.json({ success: true });
  });
});



app.get('/keranjang', ensureAuthenticated, (req, res) => {
  const cartData = req.session.checkedOutCart || [];
  console.log('Session data:', req.session);
  console.log('Cart data to be rendered:', cartData);


  const total = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  res.render('transaksi/keranjang', { cart: cartData, user: req.session.user, total });
});






/*----------------------------------*/
/*MANAGEMENT TRANKSAKSI*/
/*----------------------------------*/

app.get('/transaksiadmin', ensureAuthenticated, ensureRole('admin'), async (req, res) => {
  const books = await BookTransactionContract.getAllTransactions();

  const booksWithRelation = Array.from(books).map(book => {
  return book;
});

    res.render('admin/transaksi', { books: booksWithRelation, user : req.session.user });
});



app.get('/transaksipenerbit', ensureAuthenticated, ensureRole('penerbit'), async (req, res) => {
  const publisherId = req.session.user.id;

  try {
      
    const privateKeyQuery = 'SELECT private_key, `index` FROM penerbit WHERE id = ?';
    const result = await new Promise((resolve, reject) => {
          db.query(privateKeyQuery, [publisherId], (err, results) => {
              if (err) reject(err);
              else if (results.length > 0) resolve(results[0]);
              else reject(new Error('Publisher not found'));
          });
        });

    const signer = new ethers.Wallet(result.private_key, provider);
    const PubliserContractWithSigner = PubliserContract.connect(signer);

    publiser = result.index;

    const ordertx = await PubliserContractWithSigner.getPubliserTransactions(publiser);

    const Transaksi = Array.from(ordertx).map((order) => {
      return order;
    })


      res.render('publikasi/transaksi_penerbit', {
          order : Transaksi,
          user: req.session.user
      });
  } catch (error) {
      console.error('Error fetching transactions from database:', error);
      res.status(500).send('Failed to fetch transactions');
  }
});





/*----------------------------------*/
/*MANAGEMENT PEMBAYARAN*/
/*----------------------------------*/
app.post('/payment', ensureAuthenticated, async (req, res) => {
  const { items, paymentMethod } = req.body; 
  const userId = req.session.user.id;

  console.log("Items received:", items);
  console.log("User ID:", userId);

  try {
      const privateKeyQuery = 'SELECT private_key, `index` FROM user WHERE id = ?';
      const result = await new Promise((resolve, reject) => {
          db.query(privateKeyQuery, [userId], (err, results) => {
              if (err) reject(err);
              else if (results.length > 0) resolve(results[0]);
              else reject(new Error('User not found'));
          });
      });

      const wallet = new ethers.Wallet(result.private_key, provider);
      const BookTransactionContractWithSigner = BookTransactionContract.connect(wallet);
      
      BookTransactionContractWithSigner.once('TransactionAdded', async (transactionindex) => {
          console.log("Transaction added:", transactionindex);
      });
      
      for (const item of items) {
          const { id, quantity, subtotal, publisherId, gambarBuku, title } = item;
          console.log("Processing transaction for item ID:", id);
          const response = await BookTransactionContractWithSigner.addTransaction(
              result.index,
              parseInt(publisherId),
              parseInt(id),
              gambarBuku,
              title,
              parseInt(quantity),
              parseInt(subtotal),
              paymentMethod
          );
          console.log("Transaction response:", response.wait());
          await response.wait();
      }
      // Clear the cart after payment is processed
      req.session.cart = [];
      req.session.save(err => {
          if (err) {
              console.error('Error saving session:', err);
              return res.status(500).json({ success: false, message: 'Failed to save session' });
          }
          res.redirect('/myorder');
      });
  } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).send('Failed to process payment');
  }
});



app.get('/myorder', ensureAuthenticated, async (req, res) => {
  const userId = req.session.user.id;
  
  try {

      const privateKeyQuery = 'SELECT private_key, `index` FROM user WHERE id = ?';
      const result = await new Promise((resolve, reject) => {
            db.query(privateKeyQuery, [userId], (err, results) => {
                if (err) reject(err);
                else if (results.length > 0) resolve(results[0]);
                else reject(new Error('user not found'));
            });
          });

      const signer = new ethers.Wallet(result.private_key, provider);
      const UserContractWithSigner = UserContract.connect(signer);

      user = result.index;

      const ordertx = await UserContractWithSigner.getUserTransactions(user);

      const Transaksi = Array.from(ordertx).map((order) => {
        return order;
      })

      res.render('transaksi/pesanan_selesai', { order: Transaksi, user : req.session.user });

  } catch (error) {
      console.error('Error fetching orders from blockchain:', error);
      res.status(500).send('Failed to retrieve orders: ' + error.message);
  }
});





/*----------------------------------*/
/*MANAGEMENT PORT*/
/*----------------------------------*/

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});


