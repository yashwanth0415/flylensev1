(function() {
    'use strict';

    const footerHTML = `<footer class="footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <img src="img/logo.png" alt="FlyLense" class="logo" />
                <p>FlyLense Media Partner Pvt Ltd — Crafting cinematic stories that captivate audiences and elevate brands. From concept to final delivery, we transform ideas into impactful visual experiences.</p>
                <div class="footer-social">
                    <a href="https://www.instagram.com/flylensemediapartner/" target="_blank" aria-label="Instagram" class="instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/flylensemediapartner" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.linkedin.com/company/flylensemediapartner" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/@flylensemediapartner" target="_blank" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                    <a href="https://wa.me/919989571223" target="_blank" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                </div>
            </div>
            <div>
                <h4 class="footer-title">Quick Links</h4>
                <div class="footer-links">
                    <a href="index.html">Home</a>
                    <a href="about.html">About Us</a>
                    <a href="portfolio.html">Portfolio</a>
                    <a href="industry.html">Industries</a>
                    <a href="blogs.html">Insights</a>
                    <a href="contact.html">Contact</a>
                </div>
            </div>
            <div>
                <h4 class="footer-title">Specialties</h4>
                <div class="footer-links">
                    <a href="portfolio.html#brand-films">Brand Films</a>
                    <a href="portfolio.html#commercials">Commercial Productions</a>
                    <a href="portfolio.html#reels">Reels & Short-Form</a>
                    <a href="portfolio.html#events">Event Coverage</a>
                    <a href="portfolio.html#aerial">Aerial Cinematography</a>
                    <a href="portfolio.html#post">Post Production</a>
                </div>
            </div>
            <div>
                <h4 class="footer-title">Connect</h4>
                <div class="footer-links">
                    <a href="mailto:hello@flylense.com"><i class="fa-solid fa-envelope"></i> hello@flylense.com</a>
                    <a href="tel:+919989571223"><i class="fa-solid fa-phone"></i> +91 99895 71223</a>
                    <a href="https://wa.me/919989571223" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp Us</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 FlyLense Media Partner Pvt Ltd. All rights reserved.</p>
            <div class="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
            </div>
        </div>
    </footer>`;

    function loadFooter() {
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) {
            placeholder.innerHTML = footerHTML;
        } else {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();