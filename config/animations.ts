import { Animation } from "@/types";

export const animations: Animation[] = [
  {
    label: "Tension",
    value: "tension",
    key: "animations.tension",
    animation: {
      duration: 1000,
      easing: 'linear',
      from: 1.1,
      to: 0,
      loop: true
    },
  },
  {
    label: "Drop",
    value: "drop",
    key: "animations",
    animation: {
      y: {
        easing: 'easeOutBounce',
        from: (ctx) => {
          if (ctx.type === 'data' && ctx.mode === 'default' && !ctx.dropped) {
            ctx.dropped = true;
            return 0;
          }
        }
      }
    },
  },
  {
    label: "Pulse",
    value: "pulse",
    key: "animations.borderWidth",
    animation: {
      duration: 750,
      from: 5,
      to: 1,
      easing: 'linear',
      loop: true,
    },
  },
  {
    label: "Beat",
    value: "beat",
    key: "animations.borderWidth",
    animation: {
      duration: 750,
      from: 5,
      to: 1,
      easing: 'easeInOutBounce',
      loop: true,
    },
  },
  {
    label: "Circle pulse",
    value: "circle-pulse",
    key: "animations.radius",
    animation: {
      duration: 750,
      from: 1,
      to: 5,
      easing: 'easeInOut',
      loop: true
    },
  },
];
