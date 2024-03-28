export function downloadUrl(url: string, filename: string): string {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  return url;
}
