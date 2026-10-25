// Web build has no ML Kit. Return the blocks a phone would find on public/sign.jpg
// (positions match the rendered sign) and run them through the same pinyin step.
import { pinyin } from 'pinyin-pro';

export const convertToPinyin = (chineseText: string): string => pinyin(chineseText, { type: 'string' });

export const processImage = async () => [
  { text: '出口', boundingBox: { x: 300, y: 190, width: 300, height: 160 } },
  { text: '洗手间', boundingBox: { x: 285, y: 550, width: 330, height: 120 } },
  { text: '小心地滑', boundingBox: { x: 250, y: 855, width: 400, height: 110 } },
].map((b) => ({ ...b, text: convertToPinyin(b.text) }));
