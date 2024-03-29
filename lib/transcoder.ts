import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const load = async () => {
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  const ffmpeg = new FFmpeg();

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}

export async function transcode(blob: Blob, mimeType: string, filename: string) {
  const webmUrl = URL.createObjectURL(blob);
  const ffmpeg = await load();

  await ffmpeg.writeFile('input.webm', await fetchFile(webmUrl));

  switch (mimeType) {
    case 'image/gif':
      await ffmpeg.exec(['-i', 'input.webm', '-pix_fmt', 'rgb24', filename], 1000);
      break;
    default:
    case 'video/mp4':
      await ffmpeg.exec(['-i', 'input.webm', '-vcodec', 'copy', '-qscale', '0', filename], 1000);
      break;
  }

  const data = (await ffmpeg.readFile(filename)) as any;

  return URL.createObjectURL(new Blob([data], {type: mimeType}));
}
