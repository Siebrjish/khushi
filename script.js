```javascript
(() => {
  'use strict';

  // Personalize these messages whenever you want.
  const memories = [
    const memories = [
{
title: 'The one who ignored you 😤',
message: 'When you said me about your friend who didnt talked to you when your mood was off and idk i probabbly hate him too a bit hehe but dw i will be always here to disturb you and to make your mood better even when i cause your mood to get off'
},
{
title: 'Cookies, but the bigger piece is mine 🍪',
message: 'you are khushi so happiness is in your name and will be always in your life so never get afraid to get sad and when will u get sad i will be there with cookies but i will always eat bigger peice hehe'
},
{
title: 'Gossip partners 🤫',
message: 'always liked hearing your stories life stuff gossip and thank you for being my best gossip friend hehe and i will be always here for your gossip'
},
{
title: 'The IRL fear 💀',
message: 'Idk how my luck is so good that i keep guessing everything but the moment you said you have seen me in IRL the peak fear i felt it was of another universe hehe'
},
{
title: 'Partners in pranks 😈',
message: 'always will be down to be your partner in pranks he he probably not in crimes unless you give me a cookie hehe'
},
{
title: 'Attitude wali Khushi 😂',
message: 'hum ab thora hindi wale me kahege he he kuch na kar paogi hnn to janti ho pahle jab server ke staff ke tarah mile owner se jo ki tum ho mere ko laga ki yaar kitna attitude kitne gussa type sidhe kah di ticket me jao lekin tumko jaan ke pata chala bahar se jitni gusse wali lagti ho andhar se utni acchi ho asse hi acchi rahna okie khushi golgappa khilayege agar asse rahogi to'
},
{
title: 'Maggie championship 🍜',
message: 'hmm kisi din ho jaye koun accha maggie bana payega hehe competiton jo hara vo jitne wale ko icecream khilayega'
},
{
title: 'Chief Gossip Officer 🫡',
message: 'asse hi mere liye life ki gossips khojte rahna thik ab tum mere life me gossips lane ki incharge ho hehe'
},
{
title: 'One more memory ✨',
message: 'This star is a little reminder of all our random talks, silly jokes and memories. More gossip and more chaos coming soon hehe'
},
{
title: 'Not the last star ⭐',
message: 'last star hai lekin ye to bas is website ka last star hai lekin hope kare hai hum log ke friendship me asse hi bhut se stars aate rahe dyan rakahana'
}
];

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
