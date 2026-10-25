import { test } from 'node:test';
import assert from 'node:assert/strict';
import { processImage } from '../services/ocrService.web.ts';

test('web OCR returns sample results only for the explicit demo and sample URI', async () => {
  globalThis.window = { location: { search: '' } };
  await assert.rejects(processImage('/sign.jpg'), /Web OCR is unavailable/);
  window.location.search = '?demo=screenshot';
  await assert.rejects(processImage('/user-photo.jpg'), /Web OCR is unavailable/);
  assert.deepEqual((await processImage('/sign.jpg')).map(block => block.text), [
    'chū kǒu', 'xǐ shǒu jiān', 'xiǎo xīn dì huá',
  ]);
  delete globalThis.window;
  await assert.rejects(processImage('/sign.jpg'), /Web OCR is unavailable/);
});
