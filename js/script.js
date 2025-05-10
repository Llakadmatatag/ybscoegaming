// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to the current navigation item
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if(link.href === currentLocation) {
            link.classList.add('active');
        }
    });

    // Initialize mini social feeds if they exist on the page
    initMiniSocialFeeds();
});

// Function to initialize mini social feeds
function initMiniSocialFeeds() {
    // Check if we're on a page with mini social feeds
    const socialFeedMini = document.querySelector('.social-feed-mini');
    if (!socialFeedMini) return;

    // Set YouTube thumbnail - using a real YBSCoegaming video thumbnail
    const videoThumb = document.querySelector('.video-thumb');
    if (videoThumb) {
        // Using a real YouTube thumbnail from the Ybscoegaming channel
        videoThumb.style.backgroundImage = "url('https://i.ytimg.com/vi/Wd-CgP5wMxQ/maxresdefault.jpg')";

        // Add error handling for the thumbnail
        const img = new Image();
        img.onload = function() {
            // Image loaded successfully, do nothing
        };
        img.onerror = function() {
            // If maxresdefault fails, try hqdefault
            videoThumb.style.backgroundImage = "url('https://i.ytimg.com/vi/Wd-CgP5wMxQ/hqdefault.jpg')";
        };
        img.src = 'https://i.ytimg.com/vi/Wd-CgP5wMxQ/maxresdefault.jpg';
    }

    // Set Instagram thumbnails
    const instaThumbs = document.querySelectorAll('.insta-thumb');
    if (instaThumbs.length > 0) {
        const sampleImages = [
            'https://via.placeholder.com/150/e50914/ffffff?text=YBS',
            'https://via.placeholder.com/150/000000/e50914?text=Rewards'
        ];

        instaThumbs.forEach((thumb, index) => {
            if (index < sampleImages.length) {
                thumb.style.backgroundImage = `url('${sampleImages[index]}')`;
            }
        });
    }

    console.log('Mini social feeds initialized');
}
