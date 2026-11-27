export const COLORS = ['#6d3bd6', '#8f5cf0', '#e58bc0', '#f5b14c', '#4fc4b0'];
const EYE_COLOR = '#f3efe6';
const PUPIL_COLOR = '#15140f';
const INNER_EAR_COLOR = 'rgb(243 239 230 / 40%)';
const SCARE_RADIUS = 170;
const SCARE_FORCE = 2600;
const HOME_FORCE = 6;
const DAMPING = 0.92;
const AREA_PER_CRITTER = 32000;
const EAR_HEIGHT = 1.25;
const TEXT_GAP = 16;
const TAP_SCARE_MS = 700;

interface Critter {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  blinkAt: number;
}

const random = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Draws the hero background animation between `header` and `text`, so critters never cover them,
 * and returns a function that stops it.
 */
export function startCritters(
  canvas: HTMLCanvasElement,
  header: HTMLElement,
  text: HTMLElement,
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return () => {};
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let critters: Critter[] = [];
  let width = 0;
  let height = 0;
  let habitatTop = 0;
  let habitatBottom = 0;
  let pointer: { x: number; y: number } | null = null;
  let tapTimer = 0;
  let frame = 0;
  let lastTime = 0;
  let inView = true;

  function populate() {
    const habitatHeight = Math.max(habitatBottom - habitatTop, 1);
    const count = Math.min(Math.max(Math.round((width * habitatHeight) / AREA_PER_CRITTER), 3), 18);
    const columns = Math.ceil(Math.sqrt((count * width) / habitatHeight));
    const rows = Math.ceil(count / columns);
    const cellWidth = width / columns;
    const cellHeight = habitatHeight / rows;

    critters = Array.from({ length: count }, (_, index) => {
      const radius = random(12, Math.min(cellWidth, cellHeight) * 0.36 + 8);
      const homeX = ((index % columns) + random(0.25, 0.75)) * cellWidth;
      const homeY = Math.min(
        Math.max(
          habitatTop + (Math.floor(index / columns) + random(0.25, 0.75)) * cellHeight,
          habitatTop + radius * EAR_HEIGHT,
        ),
        habitatBottom - radius,
      );
      return {
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        radius,
        color: COLORS[index % COLORS.length],
        phase: random(0, Math.PI * 2),
        blinkAt: random(1, 6),
      };
    });
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(devicePixelRatio, 2);
    width = rect.width;
    height = rect.height;
    habitatTop = header.getBoundingClientRect().bottom - rect.top + TEXT_GAP;
    habitatBottom = text.getBoundingClientRect().top - rect.top - TEXT_GAP;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx!.setTransform(scale, 0, 0, scale, 0, 0);
    populate();
    draw(lastTime / 1000);
  }

  function update(time: number, delta: number) {
    for (const critter of critters) {
      const driftX = Math.sin(time * 0.5 + critter.phase) * 24;
      const driftY = Math.cos(time * 0.7 + critter.phase) * 18;
      let forceX = (critter.homeX + driftX - critter.x) * HOME_FORCE;
      let forceY = (critter.homeY + driftY - critter.y) * HOME_FORCE;

      if (pointer) {
        const dx = critter.x - pointer.x;
        const dy = critter.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < SCARE_RADIUS) {
          const push = (1 - distance / SCARE_RADIUS) * SCARE_FORCE;
          forceX += (dx / distance) * push;
          forceY += (dy / distance) * push;
        }
      }

      const damping = Math.pow(DAMPING, delta * 60);
      critter.vx = (critter.vx + forceX * delta) * damping;
      critter.vy = (critter.vy + forceY * delta) * damping;
      critter.x += critter.vx * delta;
      critter.y += critter.vy * delta;

      const floor = habitatBottom - critter.radius;
      if (critter.y > floor) {
        critter.y = floor;
        critter.vy = Math.min(critter.vy, 0);
      }
    }
  }

  function drawEar(x: number, y: number, radius: number, side: number, scared: boolean) {
    // Scared cats flatten their ears to the sides.
    const tipX = x + side * radius * (scared ? 1.2 : 0.82);
    const tipY = y - radius * (scared ? 0.8 : EAR_HEIGHT);
    const innerX = x + side * radius * 0.22;
    const innerY = y - radius * 0.85;
    const outerX = x + side * radius * 0.95;
    const outerY = y - radius * 0.3;

    ctx!.beginPath();
    ctx!.moveTo(innerX, innerY);
    ctx!.lineTo(tipX, tipY);
    ctx!.lineTo(outerX, outerY);
    ctx!.closePath();
    ctx!.fill();

    const centerX = (innerX + tipX + outerX) / 3;
    const centerY = (innerY + tipY + outerY) / 3;
    const inset = (pointX: number, centre: number) => centre + (pointX - centre) * 0.5;
    const fill = ctx!.fillStyle;
    ctx!.fillStyle = INNER_EAR_COLOR;
    ctx!.beginPath();
    ctx!.moveTo(inset(innerX, centerX), inset(innerY, centerY));
    ctx!.lineTo(inset(tipX, centerX), inset(tipY, centerY));
    ctx!.lineTo(inset(outerX, centerX), inset(outerY, centerY));
    ctx!.closePath();
    ctx!.fill();
    ctx!.fillStyle = fill;
  }

  function drawWhiskers(x: number, y: number, radius: number) {
    ctx!.strokeStyle = EYE_COLOR;
    ctx!.lineWidth = Math.max(radius * 0.03, 1);
    for (const side of [-1, 1]) {
      for (const tilt of [-0.16, 0, 0.16]) {
        ctx!.beginPath();
        ctx!.moveTo(x + side * radius * 0.62, y + radius * 0.2 + tilt * radius * 0.4);
        ctx!.lineTo(x + side * radius * 1.2, y + radius * 0.2 + tilt * radius * 1.6);
        ctx!.stroke();
      }
    }
  }

  function drawCritter(critter: Critter, time: number) {
    const { x, y, radius, phase } = critter;
    const distance = pointer ? Math.hypot(x - pointer.x, y - pointer.y) : Infinity;
    const scared = distance < SCARE_RADIUS;
    const wobble = Math.sin(time * 2.5 + phase) * 0.05;

    ctx!.lineCap = 'round';
    ctx!.fillStyle = critter.color;
    drawEar(x, y, radius, -1, scared);
    drawEar(x, y, radius, 1, scared);
    ctx!.beginPath();
    ctx!.ellipse(x, y, radius * (1 + wobble), radius * (1 - wobble), 0, 0, Math.PI * 2);
    ctx!.fill();

    // Without a mouse the critters look around on their own.
    const lookX = pointer ? pointer.x : x + Math.sin(time * 0.6 + phase) * 100;
    const lookY = pointer ? pointer.y : y + Math.cos(time * 0.4 + phase) * 100;
    const eyeRadius = radius * (scared ? 0.34 : 0.3);
    // Slit pupils go wide and round when scared.
    const pupilWidth = radius * (scared ? 0.2 : 0.07);
    const pupilHeight = radius * (scared ? 0.2 : 0.18);
    const eyeY = y - radius * 0.14;

    if (time > critter.blinkAt + 0.14) {
      critter.blinkAt = time + random(2, 7);
    }
    const blinking = !scared && time > critter.blinkAt;

    for (const side of [-1, 1]) {
      const eyeX = x + side * radius * 0.38;
      if (blinking) {
        ctx!.strokeStyle = PUPIL_COLOR;
        ctx!.lineWidth = Math.max(radius * 0.07, 1.5);
        ctx!.beginPath();
        ctx!.arc(eyeX, eyeY + eyeRadius * 0.4, eyeRadius, Math.PI * 1.15, Math.PI * 1.85);
        ctx!.stroke();
        continue;
      }

      const angle = Math.atan2(lookY - eyeY, lookX - eyeX);
      const reach = eyeRadius - pupilHeight;
      ctx!.fillStyle = EYE_COLOR;
      ctx!.beginPath();
      ctx!.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = PUPIL_COLOR;
      ctx!.beginPath();
      ctx!.ellipse(
        eyeX + Math.cos(angle) * reach,
        eyeY + Math.sin(angle) * reach,
        pupilWidth,
        pupilHeight,
        0,
        0,
        Math.PI * 2,
      );
      ctx!.fill();
    }

    drawWhiskers(x, y, radius);

    const noseY = y + radius * 0.16;
    ctx!.fillStyle = PUPIL_COLOR;
    ctx!.beginPath();
    ctx!.moveTo(x - radius * 0.08, noseY);
    ctx!.lineTo(x + radius * 0.08, noseY);
    ctx!.lineTo(x, noseY + radius * 0.09);
    ctx!.closePath();
    ctx!.fill();

    const mouthY = noseY + radius * 0.13;
    ctx!.beginPath();
    if (scared) {
      ctx!.arc(x, mouthY + radius * 0.14, radius * 0.13, 0, Math.PI * 2);
      ctx!.fill();
    } else {
      ctx!.strokeStyle = PUPIL_COLOR;
      ctx!.lineWidth = Math.max(radius * 0.05, 1.25);
      ctx!.arc(x - radius * 0.12, mouthY, radius * 0.12, 0, Math.PI);
      ctx!.moveTo(x + radius * 0.24, mouthY);
      ctx!.arc(x + radius * 0.12, mouthY, radius * 0.12, 0, Math.PI);
      ctx!.stroke();
    }
  }

  function draw(time: number) {
    ctx!.clearRect(0, 0, width, height);
    for (const critter of critters) {
      drawCritter(critter, time);
    }
  }

  function tick(now: number) {
    frame = 0;
    const delta = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    update(now / 1000, delta);
    draw(now / 1000);
    schedule();
  }

  function schedule() {
    if (!reducedMotion && inView && !document.hidden && !frame) {
      frame = requestAnimationFrame(tick);
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  // Without a cursor a tap scares the critters for a moment.
  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === 'mouse') {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      return;
    }
    pointer = { x, y };
    clearTimeout(tapTimer);
    tapTimer = window.setTimeout(() => (pointer = null), TAP_SCARE_MS);
  }

  // A finger "leaves" right after every tap, so only the mouse leaving counts.
  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType === 'mouse') {
      pointer = null;
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    schedule();
  });

  resizeObserver.observe(canvas);
  resizeObserver.observe(header);
  resizeObserver.observe(text);
  viewObserver.observe(canvas);
  document.addEventListener('visibilitychange', schedule);
  if (!reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
  }

  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(tapTimer);
    resizeObserver.disconnect();
    viewObserver.disconnect();
    document.removeEventListener('visibilitychange', schedule);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerdown', onPointerDown);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);
  };
}
