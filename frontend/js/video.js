/* ============================================
   DEVELOPERSTUDIO VIDEO
   Video Playback and Interaction Logic
   ============================================ */

export function initVideo() {
    const videoElements = document.querySelectorAll('.ds-video-wrapper video');

    videoElements.forEach(video => {
        const playBtn = video.parentElement.querySelector('.ds-play-btn');

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    playBtn.classList.add('playing');
                } else {
                    video.pause();
                    playBtn.classList.remove('playing');
                }
            });
        }

        video.addEventListener('play', () => {
            if (playBtn) playBtn.classList.add('playing');
        });

        video.addEventListener('pause', () => {
            if (playBtn) playBtn.classList.remove('playing');
        });
    });
}
