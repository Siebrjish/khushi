```javascript
(() => {
  'use strict';

  // Personalize these messages whenever you want.
  const memories = [
    {
      title: 'A little happiness',
      message: 'Your name itself feels like a reminder that happiness can show up in the smallest places.'
    },
    {
      title: 'The little things',
      message: 'Sometimes the smallest conversations become the ones we remember for much longer than expected.'
    },
    {
      title: 'Your own kind of magic',
      message: 'You do not have to be extraordinary every second. Being yourself is already enough.'
    },
    {
      title: 'A quiet reminder',
      message: 'On the days when everything feels a bit too much, remember to be kind to yourself too.'
    },
    {
      title: 'A favourite memory',
      message: 'Some moments do not look important while they are happening. Later, they become the ones we treasure.'
    },
    {
      title: 'A tiny wish',
      message: 'May life give you reasons to laugh, people who understand you, and days that feel gentle.'
    },
    {
      title: 'A star for you',
      message: 'The sky has billions of stars, but this little one has your name written all over its story.'
    },
    {
      title: 'Keep shining',
      message: 'You are allowed to grow slowly, change your mind, take breaks, and figure things out in your own time.'
    },
    {
      title: 'One last thought',
      message: 'This page is small, but the time spent making something thoughtful is a little gift all by itself.'
    }
  ];

  const positions = [
    [17, 23],
    [43, 15],
    [73, 25],
    [84, 51],
    [61, 67],
    [31, 77],
    [13, 55],
    [48, 43],
    [73, 85]
  ];

  const constellation = document.getElementById('constellation');
  const dialog = document.getElementById('message-dialog');
  const title = document.getElementById('dialog-title');
  const text = document.getElementById('dialog-text');

  if (!constellation || !dialog || !title || !text) {
    console.error(
      'Khushi website: required HTML elements are missing. Check index.html.'
    );
    return;
  }

  function openMessage(index) {
    const item = memories[index];
    if (!item) return;

    title.textContent = item.title;
    text.textContent = item.message;

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      alert(item.title + '\n\n' + item.message);
    }
  }

  // Create all nine interactive stars.
  memories.forEach((item, index) => {
    const star = document.createElement('button');

    star.type = 'button';
    star.className = 'star';
    star.style.left = positions[index][0] + '%';
    star.style.top = positions[index][1] + '%';
    star.style.animationDelay = (index * 0.22) + 's';
    star.setAttribute('aria-label', 'Open message: ' + item.title);

    const symbol = document.createElement('span');
    symbol.textContent = 'Star ' + (index + 1);

    star.appendChild(document.createTextNode('✦'));
    star.appendChild(symbol);

    star.addEventListener('click', () => openMessage(index));
    constellation.appendChild(star);
  });

  // Scroll to the constellation.
  const exploreButton = document.getElementById('explore');

  if (exploreButton) {
    exploreButton.addEventListener('click', () => {
      document.getElementById('stars-section')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Close the message window.
  document.getElementById('close-dialog')
    ?.addEventListener('click', () => dialog.close());

  document.getElementById('dialog-done')
    ?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  // Reveal the final surprise.
  const revealButton = document.getElementById('reveal');
  const surpriseMessage = document.getElementById('surprise-message');

  if (revealButton && surpriseMessage) {
    revealButton.addEventListener('click', () => {
      surpriseMessage.classList.add('visible');
      revealButton.textContent = 'Your surprise is open ✦';

      surpriseMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  }

  // Optional decorative animated background.
  // The website's actual content does not depend on this effect.
  try {
    const canvas = document.getElementById('sky');
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      let stars = [];
      let width = 0;
      let height = 0;
      let frame = 0;
      let animationStarted = false;

      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.min(
          130,
          Math.floor(width * height / 8500)
        );

        stars = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.4 + 0.25,
          phase: Math.random() * Math.PI * 2
        }));
      }

      function draw() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(star => {
          const alpha =
            0.25 +
            (Math.sin(frame * 0.018 + star.phase) + 1) * 0.3;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);

          ctx.fillStyle =
            'rgba(221, 214, 255, ' + alpha + ')';

          ctx.fill();
        });

        frame++;
        requestAnimationFrame(draw);
      }

      resize();
      window.addEventListener('resize', resize);

      if (!animationStarted) {
        animationStarted = true;
        draw();
      }
    }
  } catch (error) {
    console.warn('Background effects unavailable:', error);
  }
})();
```
