import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { COLORS } from '../hero/critters';

interface Flower {
  x: number;
  y: number;
  size: number;
  rotation: number;
  spin: number;
  petals: number;
  color: string;
  born: number;
}

/** Distance the pointer travels between two flowers, in CSS pixels. */
const SPACING = 33;
const GROW_MS = 280;
const LIFE_MS = 1000;
const CENTER_COLOR = '#f3efe6';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const easeOutBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

@Component({
  selector: 'app-flower-trail',
  templateUrl: './flower-trail.html',
  styleUrl: './flower-trail.scss',
})
export class FlowerTrail {
  readonly hint = input.required<string>();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const canvas = this.canvas().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let flowers: Flower[] = [];
      let last: { x: number; y: number } | null = null;
      let frame = 0;

      const resize = () => {
        const ratio = devicePixelRatio || 1;
        canvas.width = Math.round(canvas.clientWidth * ratio);
        canvas.height = Math.round(canvas.clientHeight * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      };

      const drawFlower = (flower: Flower, scale: number, alpha: number) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(flower.x, flower.y);
        ctx.rotate(flower.rotation);
        ctx.scale(scale, scale);
        ctx.fillStyle = flower.color;
        const step = (Math.PI * 2) / flower.petals;
        for (let i = 0; i < flower.petals; i++) {
          ctx.beginPath();
          ctx.ellipse(
            0,
            -flower.size * 0.55,
            flower.size * 0.32,
            flower.size * 0.55,
            0,
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.rotate(step);
        }
        ctx.beginPath();
        ctx.arc(0, 0, flower.size * 0.24, 0, Math.PI * 2);
        ctx.fillStyle = CENTER_COLOR;
        ctx.fill();
        ctx.restore();
      };

      const clear = () => {
        // Clear in device pixels: with a fractional devicePixelRatio (125%, 150% zoom) a CSS-pixel
        // clearRect falls a fraction short of the bitmap and leaves a faint strip along the edges.
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      };

      const render = (now: number) => {
        clear();
        flowers = flowers.filter((flower) => now - flower.born < LIFE_MS);
        for (const flower of flowers) {
          const age = now - flower.born;
          const grow = reducedMotion ? 1 : easeOutBack(Math.min(age / GROW_MS, 1));
          const fade = 1 - Math.max(0, (age - LIFE_MS * 0.45) / (LIFE_MS * 0.55));
          if (!reducedMotion) {
            flower.rotation += flower.spin;
          }
          drawFlower(flower, grow, fade);
        }
        // The loop only runs while there is something on screen.
        frame = flowers.length ? requestAnimationFrame(render) : 0;
      };

      const plant = (x: number, y: number) => {
        flowers.push({
          x,
          y,
          size: random(9, 16),
          rotation: random(0, Math.PI * 2),
          spin: random(-0.02, 0.02),
          petals: Math.random() < 0.5 ? 5 : 6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          born: performance.now(),
        });
        if (!frame) {
          frame = requestAnimationFrame(render);
        }
      };

      const onMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        if (!last) {
          last = point;
          plant(point.x, point.y);
          return;
        }
        // Space flowers evenly along the path, however fast the pointer moves.
        const dx = point.x - last.x;
        const dy = point.y - last.y;
        const distance = Math.hypot(dx, dy);
        const count = Math.floor(distance / SPACING);
        for (let i = 1; i <= count; i++) {
          plant(last.x + (dx * i * SPACING) / distance, last.y + (dy * i * SPACING) / distance);
        }
        if (count) {
          last = {
            x: last.x + (dx * count * SPACING) / distance,
            y: last.y + (dy * count * SPACING) / distance,
          };
        }
      };

      const onLeave = () => {
        last = null;
      };

      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('pointercancel', onLeave);
      canvas.addEventListener('pointerup', onLeave);

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerleave', onLeave);
        canvas.removeEventListener('pointercancel', onLeave);
        canvas.removeEventListener('pointerup', onLeave);
      });
    });
  }
}
