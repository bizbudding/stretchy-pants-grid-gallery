import '../css/style.css';
import '../css/lightbox.css';
import 'flickity/css/flickity.css';
import GLightbox from 'glightbox';
import Flickity from 'flickity';

/**
 * Frontend JavaScript for the grid gallery
 */
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.wp-block-stretchypants-grid-gallery');
    let flickityInstances = new Map(); // Store Flickity instances
    let lightboxInstances = new Map(); // Store GLightbox instances

    // const updateCounter = (galleryEl, counter) => {
    //     const slideNumber = flkty.selectedIndex + 1;
    //     const slideCount = flkty.slides.length;
    //     counter.textContent = `${slideNumber}/${slideCount}`;
    // };

    // Function to initialize GLightbox for a gallery
    const initializeLightbox = (galleryEl) => {
        const elements = Array.from(galleryEl.querySelectorAll('figure')).map(figure => {
            const media = figure.querySelector('img, video');
            if (!media) return null;

            return {
                href: media.src,
            };
        }).filter(Boolean);

        const lightbox = GLightbox({
            elements,
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            openEffect: 'fade',
            closeEffect: 'fade',
            cssEfects: {
              // This are some of the animations included, no need to overwrite
              fade: { in: 'fadeIn', out: 'fadeOut' },
            //   zoom: { in: 'zoomIn', out: 'zoomOut' }
            }
        });

        lightbox.on('slide_before_load', (data) => {
            const { slideIndex, slideNode } = data;
            slideNode.dataset.slideIndex = slideIndex + 1;
            slideNode.dataset.totalSlides = elements.length;
        });

        lightboxInstances.set(galleryEl, lightbox);

        // Add click handlers to figures
        galleryEl.querySelectorAll('figure').forEach((figure, index) => {
            figure.style.cursor = 'pointer';
            figure.addEventListener('click', (e) => {
                e.preventDefault();
                lightbox.openAt(index);
            });
        });
    };

    // Function to initialize or destroy Flickity based on screen width
    const handleResize = () => {
        galleries.forEach((galleryEl) => {
            const isMobile = window.matchMedia('(max-width: 599px)').matches;
            const existingFlickity = flickityInstances.get(galleryEl);

            if (isMobile && !existingFlickity) {
                // Initialize Flickity with existing options
                const flkty = new Flickity(galleryEl, {
                    cellAlign: 'left',
                    contain: true,
                    pageDots: true,
                    prevNextButtons: false,
                    clickable: false,
                    autoPlay: true,
                    wrapAround: true,
                });

                flickityInstances.set(galleryEl, flkty);
            } else if (!isMobile && existingFlickity) {
                // Remove counter (it will be automatically removed with destroy())
                existingFlickity.destroy();
                flickityInstances.delete(galleryEl);
            }
        });
    };

    // Initialize lightbox for all galleries
    galleries.forEach(galleryEl => {
        initializeLightbox(galleryEl);
    });

    // Initial check for Flickity
    handleResize();

    // Listen for window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });

    // Clean up on page unload
    window.addEventListener('unload', () => {
        // Destroy all Flickity instances
        flickityInstances.forEach(instance => instance.destroy());
        flickityInstances.clear();

        // Close all lightboxes
        lightboxInstances.forEach(instance => instance.close());
        lightboxInstances.clear();
    });
});