// Téléchargement du CV
document.addEventListener('DOMContentLoaded', function() {
    // 1. Téléchargement du CV
    const downloadBtn = document.querySelector('.hero-buttons .btn:first-child');
    const cvUrl = 'https://drive.google.com/uc?export=download&id=1f9gr-1HMTOJq79xd7wLwVQSh5oG2CYnW';
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Solution 1: Lien direct (meilleure compatibilité)
            const link = document.createElement('a');
            link.href = cvUrl;
            link.setAttribute('download', 'CV_Kaniguy_Coulibaly.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Solution alternative si le direct ne marche pas (décommenter)
            /*
            fetch(cvUrl)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    tempLink.href = blobUrl;
                    tempLink.download = 'CV_Kaniguy_Coulibaly.pdf';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    window.URL.revokeObjectURL(blobUrl);
                })
                .catch(() => alert("Le téléchargement a échoué. Essayez avec un autre navigateur."));
            */
        });
    }

    // 2. Menu Burger (Responsive)
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }

    // 3. Fermer le menu quand on clique sur un lien (mobile)
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });

    // 4. Animation fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 5. Changement de style de la navbar au scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'var(--white)';
    }
});