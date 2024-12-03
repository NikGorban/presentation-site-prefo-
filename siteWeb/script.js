const eyes = document.querySelectorAll('.eye');

const closeEyes = () => {
    eyes.forEach(eye => {
        eye.style.background = '#000';
        eye.querySelector('.pupil').style.display = 'none';
        eye.querySelector('.lid').style.display = 'block';
    });
};

const openEyes = () => {
    eyes.forEach(eye => {
        eye.style.background = '#fff';
        eye.querySelector('.pupil').style.display = 'block';
        eye.querySelector('.lid').style.display = 'none';
    });
};

document.addEventListener('mousemove', (event) => {
    const rects = Array.from(eyes).map(eye => eye.getBoundingClientRect());
    const centers = rects.map(rect => ({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height + 130 / 2
    }));
    const distances = centers.map(center => Math.hypot(event.clientX - center.x, event.clientY - center.y));
    const minDistance = Math.min(...distances);

    if (minDistance < 200 || event.clientX < 0 || event.clientY < 0 || event.clientX > window.innerWidth || event.clientY > window.innerHeight) {
        closeEyes();
    } else {
        openEyes();
        eyes.forEach((eye, index) => {
            const dx = event.clientX - centers[index].x;
            const dy = event.clientY - centers[index].y;
            const angle = Math.atan2(dy, dx);
            const maxDistance = 8;
            const pupilX = Math.min(maxDistance, distances[index]) * Math.cos(angle);
            const pupilY = Math.min(maxDistance, distances[index]) * Math.sin(angle);
            eye.querySelector('.pupil').style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    }
});


