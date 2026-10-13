// Scoped lightbox galleries
document.querySelectorAll('[data-lightbox]').forEach(lightbox => {
    const modal = lightbox.querySelector('[data-lightbox-modal]');
    const closeButton = lightbox.querySelector('[data-lightbox-close]');
    const previousButton = lightbox.querySelector('[data-lightbox-previous]');
    const nextButton = lightbox.querySelector('[data-lightbox-next]');
    const triggers = [...lightbox.querySelectorAll('[data-lightbox-trigger]')];
    const slides = [...lightbox.querySelectorAll('[data-lightbox-slide]')];

    if (!modal || !closeButton || triggers.length === 0 || slides.length === 0) return;

    let slideIndex = 0;
    let activeTrigger = null;

    const pauseVideos = () => {
        lightbox.querySelectorAll('lite-youtube').forEach(video => {
            video.shadowRoot?.querySelector('iframe')?.contentWindow?.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                '*'
            );
        });
    };

    const showSlide = index => {
        pauseVideos();
        slideIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, position) => {
            slide.hidden = position !== slideIndex;
        });
    };

    const closeModal = () => {
        pauseVideos();
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.documentElement.style.removeProperty('overflow');
        document.body.style.removeProperty('overflow');
        activeTrigger?.focus();
    };

    const openModal = index => {
        activeTrigger = triggers[index];
        showSlide(index);
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    };

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => openModal(index));
    });

    closeButton.addEventListener('click', closeModal);

    if (slides.length > 1) {
        previousButton?.addEventListener('click', () => showSlide(slideIndex - 1));
        nextButton?.addEventListener('click', () => showSlide(slideIndex + 1));
    } else {
        previousButton?.setAttribute('hidden', '');
        nextButton?.setAttribute('hidden', '');
    }

    modal.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowLeft' && slides.length > 1) showSlide(slideIndex - 1);
        if (event.key === 'ArrowRight' && slides.length > 1) showSlide(slideIndex + 1);
    });

    showSlide(0);
});
