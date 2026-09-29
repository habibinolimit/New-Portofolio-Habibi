
/* =========================================================
   PROJECTS.JS
   NON-CAMPUS PROJECT POPUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectItems = document.querySelectorAll(
        ".creative-gallery .creative-item"
    );

    if (!projectItems.length) {
        return;
    }


    /* =====================================================
       CREATE MODAL
    ===================================================== */

    const modal = document.createElement("div");

    modal.className = "project-modal";

    modal.innerHTML = `
        <div class="project-modal-overlay"></div>

        <div class="project-modal-box">

            <button
                class="project-modal-close"
                type="button"
                aria-label="Close popup"
            >
                <i class="bx bx-x"></i>
            </button>

            <div class="project-modal-media"></div>

            <div class="project-modal-content">

                <span class="project-modal-category">
                    PROJECT
                </span>

                <h2 class="project-modal-title">
                    Project Name
                </h2>

                <div class="project-modal-info">

                    <div class="modal-info-item">

                        <span class="modal-info-label">
                            JENIS PROJECT
                        </span>

                        <p class="project-modal-type">
                            -
                        </p>

                    </div>

                    <div class="modal-info-item">

                        <span class="modal-info-label">
                            TOOLS
                        </span>

                        <p class="project-modal-tools">
                            -
                        </p>

                    </div>

                </div>

                <div class="modal-info-item modal-description">

                    <span class="modal-info-label">
                        DESCRIPTION
                    </span>

                    <p class="project-modal-description">
                        -
                    </p>

                </div>

                <a
                    href="#"
                    class="project-modal-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Project
                    <i class="bx bx-right-arrow-alt"></i>
                </a>

            </div>

        </div>
    `;


    document.body.appendChild(modal);


    /* =====================================================
       SELECT MODAL ELEMENTS
    ===================================================== */

    const overlay =
        modal.querySelector(".project-modal-overlay");

    const box =
        modal.querySelector(".project-modal-box");

    const closeButton =
        modal.querySelector(".project-modal-close");

    const media =
        modal.querySelector(".project-modal-media");

    const category =
        modal.querySelector(".project-modal-category");

    const title =
        modal.querySelector(".project-modal-title");

    const type =
        modal.querySelector(".project-modal-type");

    const tools =
        modal.querySelector(".project-modal-tools");

    const description =
        modal.querySelector(".project-modal-description");

    const link =
        modal.querySelector(".project-modal-link");


    /* =====================================================
       OPEN POPUP
    ===================================================== */

    projectItems.forEach((project) => {

        project.addEventListener("click", (event) => {

            event.preventDefault();


            /* ---------------------------------------------
               PROJECT DATA
            --------------------------------------------- */

            const projectCategory =
                project.dataset.type || "PROJECT";

            const projectTitle =
                project.dataset.title ||
                project.querySelector("h3")?.textContent.trim() ||
                "Untitled Project";

            const projectType =
                project.dataset.projectType ||
                projectCategory;

            const projectTools =
                project.dataset.tools ||
                "-";

            const projectDescription =
                project.dataset.description ||
                "Tidak ada deskripsi project.";

            const projectLink =
                project.dataset.link || "";


            /* ---------------------------------------------
               INSERT DATA
            --------------------------------------------- */

            category.textContent =
                projectCategory;

            title.textContent =
                projectTitle;

            type.textContent =
                projectType;

            tools.textContent =
                projectTools;

            description.textContent =
                projectDescription;


            /* ---------------------------------------------
               PROJECT LINK
            --------------------------------------------- */

            if (
                projectLink &&
                projectLink !== "#"
            ) {

                link.href =
                    projectLink;

                link.style.display =
                    "inline-flex";

            } else {

                link.removeAttribute("href");

                link.style.display =
                    "none";

            }


            /* ---------------------------------------------
               CLEAR OLD MEDIA
            --------------------------------------------- */

            media.innerHTML = "";


            /* ---------------------------------------------
               CHECK VIDEO
            --------------------------------------------- */

            const projectVideo =
                project.querySelector("video");


            if (projectVideo) {

                const source =
                    projectVideo.querySelector("source");


                const videoSource =
                    source?.getAttribute("src") ||
                    projectVideo.getAttribute("src");


                if (videoSource) {

                    const video =
                        document.createElement("video");


                    video.className =
                        "project-modal-video";

                    video.src =
                        videoSource;

                    video.controls =
                        true;

                    video.playsInline =
                        true;

                    video.preload =
                        "metadata";

                    video.loop =
                        false;

                    video.autoplay =
                        true;

                    video.muted =
                        false;


                    media.appendChild(video);


                    /* Browser may block autoplay with sound */

                    video.play().catch(() => {

                        video.muted = true;

                        video.play().catch(() => {});

                    });

                }

            }


            /* ---------------------------------------------
               CHECK IMAGE
            --------------------------------------------- */

            else {

                const projectImage =
                    project.querySelector("img");


                if (projectImage) {

                    const image =
                        document.createElement("img");


                    image.className =
                        "project-modal-image";

                    image.src =
                        projectImage.getAttribute("src");

                    image.alt =
                        projectTitle;


                    media.appendChild(image);

                }

            }


            /* ---------------------------------------------
               SHOW MODAL
            --------------------------------------------- */

            modal.classList.add("active");

            document.body.classList.add(
                "project-modal-open"
            );

        });

    });


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    function closeModal() {

        const video =
            media.querySelector("video");


        if (video) {

            video.pause();

            video.currentTime = 0;

        }


        modal.classList.remove("active");

        document.body.classList.remove(
            "project-modal-open"
        );


        setTimeout(() => {

            if (!modal.classList.contains("active")) {

                media.innerHTML = "";

            }

        }, 300);

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeButton.addEventListener(
        "click",
        closeModal
    );


    /* =====================================================
       CLOSE BY OVERLAY
    ===================================================== */

    overlay.addEventListener(
        "click",
        closeModal
    );


    /* =====================================================
       CLOSE WITH ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       PREVENT BOX CLICK FROM CLOSING
    ===================================================== */

    box.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

        }
    );


    console.log(
        "Non-Campus Project Popup berhasil dimuat."
    );

});
