// Configuration de Toastify
function showToast(message, isSuccess = true) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: isSuccess ? "#3498db" : "#e74c3c",
        className: "toastify-custom",
        stopOnFocus: true
    }).showToast();
}

document.addEventListener('DOMContentLoaded', function() {
    // ==================== TÉLÉCHARGEMENT CV ====================
    const downloadCvBtn = document.querySelector('.hero-buttons .btn:first-child');
    
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            showToast("Préparation du téléchargement...");
            
            const cvUrl = 'https://drive.google.com/uc?export=download&id=1f9gr-1HMTOJq79xd7wLwVQSh5oG2CYnW';
            const fileName = 'CV_Kaniguy_Coulibaly.pdf';

            try {
                // Essai méthode directe
                const directLink = document.createElement('a');
                directLink.href = cvUrl;
                directLink.download = fileName;
                directLink.target = '_blank';
                document.body.appendChild(directLink);
                
                // Déclencher le téléchargement
                directLink.click();
                showToast("Téléchargement démarré !");
                
                // Nettoyage après 1s
                setTimeout(() => {
                    document.body.removeChild(directLink);
                }, 1000);

            } catch (error) {
                // Fallback avec fetch
                showToast("Tentative alternative...", false);
                try {
                    const response = await fetch(cvUrl);
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    
                    const fallbackLink = document.createElement('a');
                    fallbackLink.href = blobUrl;
                    fallbackLink.download = fileName;
                    fallbackLink.click();
                    
                    showToast("Téléchargement réussi !");
                    URL.revokeObjectURL(blobUrl);
                } catch (fetchError) {
                    showToast("Échec du téléchargement. Essayez manuellement.", false);
                    console.error("Erreur:", fetchError);
                }
            }
        });
    }

    // ==================== MENU BURGER ====================
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            // Animation burger
            this.classList.toggle('toggle');
            
            // Affichage menu
            navLinks.classList.toggle('active');
            
            // Bloquer le scroll quand menu ouvert
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fermeture menu au clic sur lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.style.overflow = '';
            }
        });
    });

    // ==================== SCROLL FLUIDE ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Mise à jour URL sans rechargement
                    history.pushState(null, null, this.hash);
                }
            }
        });
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            nav.style.backdropFilter = 'blur(5px)';
        } else {
            nav.style.background = 'var(--white)';
            nav.style.boxShadow = 'none';
            nav.style.backdropFilter = 'none';
        }
    });

    // ==================== ANIMATIONS AU SCROLL ====================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card');
        
        elements.forEach(el => {
            const elPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elPosition < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation
    window.addEventListener('load', () => {
        document.querySelectorAll('.skill-category, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
        });
        animateOnScroll();
    });
    
    window.addEventListener('scroll', animateOnScroll);
});


// Gestion du préloader
window.addEventListener('load', function() {
    // Animation de la barre de chargement
    const progressBar = document.querySelector('.loading-progress');
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    
    // Disparition après 3 secondes (ajustez selon vos besoins)
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            
            // Retire complètement après l'animation
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }
    }, 3000);
});

// Lecture automatique de la vidéo d'arrière-plan
