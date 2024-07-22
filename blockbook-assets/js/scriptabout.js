    var modal = document.getElementById('profileModal');
    var closeModal = document.getElementById('closeModal');
    var profileLinks = document.querySelectorAll('.card-btn');
  
    function openModal() {
      modal.style.display = 'block';
    }
  
    function closeModalFunc() {
      modal.style.display = 'none';
    }
  
    profileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        openModal();
      });
    });
  
    closeModal.addEventListener('click', function() {
      closeModalFunc();
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        closeModalFunc();
      }
    });