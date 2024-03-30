export async function record(canvas: HTMLCanvasElement): Promise<Blob> {
  const frames: Blob[] = [];
  const timeLimit = 4000;

  const time = 0;

  return new Promise(function (resolve, reject) {
    const stream = canvas.captureStream(60);

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=h264"
    });

    mediaRecorder.start(time);

    mediaRecorder.ondataavailable = function (event) {
      frames.push(event.data);

      // Stop if nothing detected.
      if (event.data.size === 0) {
        mediaRecorder.stop();
      }
    }

    mediaRecorder.onstop = function () {
      const blob = new Blob(frames, { type: 'video/webm;codecs=h264' })
      resolve(blob);
    }

    // Stop recording after 4 seconds max
    setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, timeLimit);
  });
}
