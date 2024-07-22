function renderHeaderPenerbit() {

    const defaultPhoto = "image/user.png";

    let userPhotoUrl = userphoto ? userphoto : defaultPhoto;

    const headerpenerbitHTML = `
     <header class="header" data-header>
        <div class="header-top">
            <div class="container">

                <button class="openbtn" onclick="openNav()">&#9776; </button>

                <a href="/admin" class="logo" style="padding-top: 10px;">
                    <img src="image/blockbook-logo.png" width="138" height="28" alt="booken home">
                </a>

                <div class="input-wrapper">
                    <input type="search" name="search" placeholder="Search our store" class="input-field">
                </div>

            </div>
        </div>

        <div class="navbar-admin" id="mySidebar">
            <div class="navbar-admin-header">
                <div class="user-info">
                    <img src="${userPhotoUrl}" alt="User Photo" class="user-photo">
                    <span class="nama-nav-header">${usernama}</span>
                </div>
                <a href="javascript:void(0)" class="closebtn-admin" onclick="closeNav()"></a>
            </div>
            <ul class="navbar-admin-content">
                <li><a href="/publikasi" class="navbar-menu-link">Form Publikasi</a></li>
                <li><a href="/transaksipenerbit" class="navbar-menu-link">Transaksi Buku</a></li>
            </ul>
            <div class="navbar-admin-footer">
                <button onclick="window.location.href='/profil'" class="edit-profile-btn">Edit Profile</button>
                <button class="edit-profile-btn" aria-label="user" title="Logout" onclick="window.location.href='/logout'">
                    <ion-icon name="log-out-outline" aria-hidden="true"></ion-icon>
                    Logout
                </button>
            </div>
        </div>

        <div class="navbar-overlay" id="myOverlay" onclick="closeNav()"></div>
    </header>
    `;
    document.getElementById('headerpenerbit').innerHTML = headerpenerbitHTML;
}

function renderFooterPenerbit() {
    const footerpenerbitHTML = `
   <footer class="footer has-bg-image" style="background-color: var(--green);">

      <div class="footer-top section">
          <div class="container grid-list">

              <div class="footer-brand">

                  <a href="/admin" class="logo-footer">
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
    document.getElementById('footerpenerbit').innerHTML = footerpenerbitHTML;
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

renderHeaderPenerbit();
renderFooterPenerbit();

document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 0) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});
