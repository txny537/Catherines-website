/* ============================================
   1. PUT YOUR PHOTOS HERE
   ------------------------------------------------
   Add your images to the /images folder (next to this file),
   then list their filenames below, in the order you want
   them to appear in the slideshow.
   ============================================ */
const IMAGES = [
  "images/IMG_7290.JPG",
  "images/IMG_7292.JPG",
  "images/IMG_7296.JPG",
];

/* ============================================
   FLOATING HEARTS BACKGROUND
   ============================================ */
(function spawnFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const count = 14;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 14 + Math.random() * 22 + 'px';
    const duration = 10 + Math.random() * 12;
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = -(Math.random() * duration) + 's';
    container.appendChild(heart);
  }
})();

/* ============================================
   SCREEN SWITCHING
   ============================================ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('screen--active'));
  document.getElementById(id).classList.add('screen--active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================
   2. THE "NO" BUTTON THAT RUNS AWAY
   ============================================ */
const noBtn = document.getElementById('noBtn');
const noHint = document.getElementById('noHint');
let dodgeCount = 0;
let dodgeCooldown = false;

function dodge() {
  if (dodgeCooldown) return; // ignore retriggers while it's mid-move
  dodgeCooldown = true;
  setTimeout(() => { dodgeCooldown = false; }, 450);

  dodgeCount++;
  // switch it to fixed positioning the first time it runs, so it can
  // be placed anywhere on the screen (not just inside the card)
 if (!noBtn.classList.contains('is-dodging')) {
    const rect = noBtn.getBoundingClientRect();
    document.body.appendChild(noBtn);
    noBtn.style.top = rect.top + 'px';
    noBtn.style.left = rect.left + 'px';
    noBtn.classList.add('is-dodging');
  }

  const btnRect = noBtn.getBoundingClientRect();
  const margin = 12;
  const maxLeft = window.innerWidth - btnRect.width - margin;
  const maxTop = window.innerHeight - btnRect.height - margin;

  const newLeft = Math.max(margin, Math.random() * maxLeft);
  const newTop = Math.max(margin, Math.random() * maxTop);

  noBtn.style.left = newLeft + 'px';
  noBtn.style.top = newTop + 'px';

  // playful, escalating hint text
  const hints = [
    "psst... the no button is a little shy",
    "nope, try again 😏",
    "it really doesn't want to be clicked",
    "okay this is getting impressive, keep trying",
    "at this point just click yes 😌",
    "the no button has left the chat"
  ];
  noHint.textContent = hints[Math.min(dodgeCount - 1, hints.length - 1)];
}

noBtn.addEventListener('mouseenter', dodge);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); }, { passive: false });
// keyboard users tabbing to the button shouldn't get stuck — dodge on focus too
noBtn.addEventListener('focus', dodge);

/* ============================================
   3. YES BUTTON -> GALLERY SCREEN
   ============================================ */
document.getElementById('yesBtn').addEventListener('click', () => {
  showScreen('screen-gallery');
  buildSlideshow();
});

/* ============================================
   4. SLIDESHOW
   ============================================ */
const slideTrack = document.getElementById('slideTrack');
const slideDotsWrap = document.getElementById('slideDots');
let currentSlide = 0;
let slideCount = 0;
let autoplayTimer = null;

function buildSlideshow() {
  slideTrack.innerHTML = '';
  slideDotsWrap.innerHTML = '';

  const slides = IMAGES.length > 0 ? IMAGES : [null]; // fall back to one placeholder
  slideCount = slides.length;

  slides.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    if (src) {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Us, photo ${i + 1}`;
      slide.appendChild(img);
    } else {
      slide.classList.add('slide--placeholder');
      slide.innerHTML = `
        <div class="placeholder-icon">🖼️</div>
        <div>Add your photos to the <strong>/images</strong> folder,<br>
        then list them in the <strong>IMAGES</strong> array at the<br>
        top of script.js</div>
      `;
    }
    slideTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'slide-dot';
    dot.addEventListener('click', () => goToSlide(i));
    slideDotsWrap.appendChild(dot);
  });

  currentSlide = 0;
  updateSlidePosition();
  restartAutoplay();
}

function updateSlidePosition() {
  slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slide-dot').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === currentSlide);
  });
}

function goToSlide(i) {
  currentSlide = (i + slideCount) % slideCount;
  updateSlidePosition();
  restartAutoplay();
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  if (slideCount > 1) {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
  }
}

document.getElementById('prevSlide').addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextSlide').addEventListener('click', () => goToSlide(currentSlide + 1));

/* ============================================
   5. GALLERY -> END SCREEN
   ============================================ */
document.getElementById('toEndBtn').addEventListener('click', () => {
  clearInterval(autoplayTimer);
  showScreen('screen-end');
  launchConfetti();
});

/* ============================================
   6. CONFETTI ON THE FINAL SCREEN
   ============================================ */
function launchConfetti() {
  const wrap = document.getElementById('confetti');
  wrap.innerHTML = '';
  const colors = ['#E23F63', '#E8A73D', '#FFB6C1', '#C22C4E'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2.5 + Math.random() * 2 + 's';
    piece.style.animationDelay = Math.random() * 0.6 + 's';
    wrap.appendChild(piece);
  }
}
