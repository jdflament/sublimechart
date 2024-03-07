const Background = {
  id: 'background',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';

    if (options.color && isLinearGradient(options.color)) {
      ctx.fillStyle = convertLinearGradientToCanvasGradient(options.color, ctx, chart.width, chart.height);
    } else {
      ctx.fillStyle = options.color || 'transparent';
    }

    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

function isLinearGradient(color: string): boolean {
  return color.startsWith('linear-gradient');
}

function convertLinearGradientToCanvasGradient(linearGradient: string, ctx: CanvasRenderingContext2D, width: number, height: number): CanvasGradient {
  // Regular expression to extract color stops and direction from linear-gradient syntax
  const regex = /linear-gradient\((.*?)\)/;
  const match = linearGradient.match(regex);

  if (!match) {
    throw new Error('Invalid linear gradient syntax');
  }

  const gradientParams = match[1].split(',');
  const direction = gradientParams[0].trim();
  const colorStops = gradientParams.slice(1);

  // Adjusted canvas coordinates for the exact same behavior as CSS
  let x0 = 0, y0 = 0, x1 = 0, y1 = 0;

  switch (direction) {
    case 'to top':
      y0 = height;
      break;
    case 'to bottom':
      y1 = height;
      break;
    case 'to left':
      x0 = width;
      break;
    case 'to right':
      x1 = width;
      break;
    case 'to top left':
      x0 = width;
      y0 = height;
      break;
    case 'to top right':
      x1 = width;
      y0 = height;
      break;
    case 'to bottom left':
      x0 = width;
      y1 = height;
      break;
    case 'to bottom right':
      x1 = width;
      y1 = height;
      break;
    default:
      throw new Error('Invalid gradient direction');
  }

  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

  // Add color stops to the gradient
  colorStops.forEach((colorStop, index) => {
    const parts = colorStop.trim().split(' ');
    const color = parts[0];
    let position: number;
    position = index / (colorStops.length - 1);
    gradient.addColorStop(position, color);
  });

  return gradient;
}


export default Background;
