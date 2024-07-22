  function renderHeaderAdmin(){

    const defaultPhoto = "image/user.png"; 

    let userPhotoUrl = userphoto ? userphoto : defaultPhoto;

    const headeradminHTML = `
     <header class="header" data-header>
        <div class="header-top">
            <div class="container">

                <button class="openbtn" onclick="openNav()">&#9776; </button>

                <a href="/admin" class="logo" style="padding-top: 10px;">
                    <img src="image/blockbook-logo.png" width="138" height="28" alt="booken home">
                </a>

                <div class="input-wrapper">
                    <input type="search" name="search" id="search-input" placeholder="Search our store" class="input-field">
                <button class="btn btn-primary" onclick="searchBooks()">Search</button>
                </div>

            </div>
        </div>

        <div class="navbar-admin" id="mySidebar">
            <div class="navbar-admin-header">
                <div class="user-info">
                    <img src="${userPhotoUrl}" alt="User Photo" class="user-photo">
                    <span class="nama-nav-header">${usernama}</span>
                </div>
                <a href="javascript:void(0)" class="closebtn-admin" onclick="closeNav()">&times;</a>
            </div>
            <ul class="navbar-admin-content">
                <li><a href="/admin" class="navbar-menu-link">Home</a></li>
                <li><a href="/databuku" class="navbar-menu-link">Data Buku</a></li>
                <li><a href="/transaksiadmin" class="navbar-menu-link">Transaksi Buku</a></li>
            </ul>
            <div class="navbar-admin-footer">
                <button class="header-action-btn" aria-label="user" title="Logout" onclick="window.location.href='/logout'">
                    <ion-icon name="log-out-outline" aria-hidden="true"></ion-icon>
                    Logout
                </button>
            </div>
        </div>

        <div class="navbar-overlay" id="myOverlay" onclick="closeNav()"></div>
    </header>
    `;
    document.getElementById('headeradmin').innerHTML = headeradminHTML;
}

function renderFooteradmin(){
  const footeradminHTML = `
   <footer class="footer has-bg-image" style="background-color: var(--green);">

      <div class="footer-top section">
          <div class="container grid-list">

              <div class="footer-brand">

                  <a href="/admin" class="logo">
                      <img src="image/block-white.png" width="138" height="28" alt="booken home">
                  </a>

                  <p class="footer-text">
                      Blockbook merupakan website berbasis teknologi blockchain dalam penerbitan buku dan pembelian buku dibekali dengan fitur web2 dan web3.
                  </p>

                  <ul class="social-list">

                      <li>
                          <a href="#" class="social-link">
                              <ion-icon name="logo-facebook"></ion-icon>
                          </a>
                      </li>

                      <li>
                          <a href="#" class="social-link">
                              <ion-icon name="logo-twitter"></ion-icon>
                          </a>
                      </li>

                      <li>
                          <a href="#" class="social-link">
                              <ion-icon name="logo-instagram"></ion-icon>
                          </a>
                      </li>

                      <li>
                          <a href="#" class="social-link">
                              <ion-icon name="logo-youtube"></ion-icon>
                          </a>
                      </li>

                      <li>
                          <a href="#" class="social-link">
                              <ion-icon name="logo-pinterest"></ion-icon>
                          </a>
                      </li>

                  </ul>

              </div>

              <ul class="footer-list">

                  <li>
                      <p class="footer-list-title">Pages</p>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Shop</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">About</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Contact Us</a>
                  </li>

              </ul>

              <ul class="footer-list">

                  <li>
                      <p class="footer-list-title">Category</p>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Book of War</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Book of Lifestyle</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Book of Hobby</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Book of Study</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Book of Technology</a>
                  </li>

              </ul>

              <ul class="footer-list">

                  <li>
                      <p class="footer-list-title">Services</p>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Buy Book</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Publication Book</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Search Book</a>
                  </li>

                  <li>
                      <a href="#" class="footer-link">Book Category</a>
                  </li>

              </ul>

          </div>
      </div>

      <div class="footer-bottom">
          <div class="container">

              <p class="copyright">
                  Copyright 2024 | Made by Anonymus Teknik.
              </p>

              <img src="image/payment-mehtod.png" width="311" height="30" loading="lazy" alt="Payment method" class="w-100">

          </div>
      </div>

  </footer>
  `;
  document.getElementById('footeradmin').innerHTML = footeradminHTML;
}


function openNav() {
  document.getElementById("mySidebar").style.left = "0";
  document.getElementById("myOverlay").style.display = "block";
  document.querySelector(".main-content").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.left = "-250px";
  document.getElementById("myOverlay").style.display = "none";
  document.querySelector(".main-content").style.marginLeft = "0";
}

renderHeaderAdmin();
renderFooteradmin();


document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchBooks();
    }
});

function searchBooks() {
    let input = document.getElementById('search-input').value.toUpperCase();
    let bookItems = document.querySelectorAll('.book-item');

    bookItems.forEach(item => {
        let bookName = item.getAttribute('data-book-name').toUpperCase();
        if (bookName.indexOf(input) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    return;
    const response = await fetch('/chartadmin');
    const salesData = await response.json();

    const salesTableBody = document.querySelector('#salesTable tbody');
    salesData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.sold}</td>`;
        salesTableBody.appendChild(row);
    });

    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.map(item => item.name),
            datasets: [{
                label: 'Jumlah Terjual',
                data: salesData.map(item => item.sold),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

