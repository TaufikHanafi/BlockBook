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


