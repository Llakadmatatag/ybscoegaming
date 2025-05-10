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
        // Using a sample YouTube thumbnail from the channel
        videoThumb.style.backgroundImage = "url('https://i.ytimg.com/vi/sample-video-id/mqdefault.jpg')";
        // Note: Replace 'sample-video-id' with an actual video ID from the YBSCoegaming channel
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
