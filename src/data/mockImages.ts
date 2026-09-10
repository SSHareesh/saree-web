import festiveSaree from '../assets/festive_saree.jpg';
import silkSaree from '../assets/silk-sarees.jpg';
import weddingSaree from '../assets/wedding-sarees.jpg';

// The 3 mock saree photos
export const mockSareeImages = [
  festiveSaree,
  silkSaree,
  weddingSaree,
];

// Return an array of mock images rotated deterministically for variety
export function getMockSareeImages(index: number, count: number = 3): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(mockSareeImages[(index + i) % mockSareeImages.length]);
  }
  return result;
}

export { festiveSaree, silkSaree, weddingSaree };
