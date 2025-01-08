let currentOffset = 0;

function updateCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    carouselTrack.style.transform = `translateX(${currentOffset}px)`;
}

function moveLeft() {
    const carouselContainer = document.querySelector('.carousel-track-container');
    const carouselTrack = document.querySelector('.carousel-track');
    
    const containerWidth = carouselContainer.offsetWidth;
    const trackWidth = carouselTrack.scrollWidth;
    
    currentOffset += containerWidth;
    if (currentOffset > 0) {
        currentOffset = 0;
    }
    
    updateCarousel();
}

function moveRight() {
    const carouselContainer = document.querySelector('.carousel-track-container');
    const carouselTrack = document.querySelector('.carousel-track');
    
    const containerWidth = carouselContainer.offsetWidth;
    const trackWidth = carouselTrack.scrollWidth; 
    
    currentOffset -= containerWidth;
    if (Math.abs(currentOffset) + containerWidth > trackWidth) {
        currentOffset = -(trackWidth - containerWidth);
    }
    
    updateCarousel();
}

document.querySelector('.carousel-button.left').addEventListener('click', moveLeft);
document.querySelector('.carousel-button.right').addEventListener('click', moveRight);

window.addEventListener('resize', () => {
    const carouselContainer = document.querySelector('.carousel-track-container');
    const carouselTrack = document.querySelector('.carousel-track');
    
    const containerWidth = carouselContainer.offsetWidth;
    const trackWidth = carouselTrack.scrollWidth;
    
    if (Math.abs(currentOffset) + containerWidth > trackWidth) {
        currentOffset = -(trackWidth - containerWidth);
    }
    
    updateCarousel();
});

updateCarousel();