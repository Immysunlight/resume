// Aperçu des projets : galerie d'images ou vidéo YouTube dans une fenêtre
(function () {
    var galleries = {
        adventureworks: [
            "01.png", "02.png", "03.png", "04.png", "05.png",
            "06.png", "07.png", "08.png", "09.png", "10.png"
        ].map(function (f) { return "./img/projects/adventureworks/" + f; })
    };

    var modal = document.getElementById("preview-modal");
    if (!modal) return;
    var body = modal.querySelector(".modal-body");
    var nav = modal.querySelector(".modal-nav");
    var counter = modal.querySelector(".modal-counter");
    var images = [];
    var index = 0;

    function showImage() {
        body.innerHTML = '<img src="' + images[index] + '" alt="Capture ' + (index + 1) + '">';
        counter.textContent = (index + 1) + " / " + images.length;
    }

    function openGallery(name) {
        images = galleries[name] || [];
        index = 0;
        nav.hidden = false;
        showImage();
        modal.hidden = false;
    }

    function openVideo(id) {
        images = [];
        nav.hidden = true;
        body.innerHTML = '<div class="modal-video"><iframe src="https://www.youtube-nocookie.com/embed/' + id +
            '?rel=0" title="Vidéo du projet" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
        modal.hidden = false;
    }

    function close() {
        modal.hidden = true;
        body.innerHTML = ""; // arrête la vidéo
    }

    function step(delta) {
        if (!images.length) return;
        index = (index + delta + images.length) % images.length;
        showImage();
    }

    document.querySelectorAll("[data-gallery]").forEach(function (btn) {
        btn.addEventListener("click", function () { openGallery(btn.dataset.gallery); });
    });
    document.querySelectorAll("[data-video]").forEach(function (btn) {
        btn.addEventListener("click", function () { openVideo(btn.dataset.video); });
    });

    modal.querySelector(".modal-close").addEventListener("click", close);
    modal.querySelector(".modal-prev").addEventListener("click", function () { step(-1); });
    modal.querySelector(".modal-next").addEventListener("click", function () { step(1); });
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) {
        if (modal.hidden) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
    });
})();
