import { listObjType } from '@/interface/storeTypes';

interface ImageData {
  path: string;
  file: any;
}

interface ListImagesEntry {
  canvasId: number;
  images: ImageData[];
}

export const listImages: ListImagesEntry[] = [];

export function addListImages(newImage: listObjType): void {
  const { canvasId, path, file } = newImage;

  const existingEntryIndex = listImages.findIndex(
    entry => entry.canvasId === canvasId
  );

  if (existingEntryIndex !== -1) {
    listImages[existingEntryIndex].images.push({ path, file });
  } else {
    listImages.push({ canvasId, images: [{ path, file }] });
  }
}


export const Images: {
    canvasId: number;
    images: ImageData[];
  }[] = [];

export function addImages(newImage: listObjType): void {
  const { canvasId, path, file } = newImage;

  const existingEntryIndex = Images.findIndex(
    entry => entry.canvasId === canvasId
  );

  if (existingEntryIndex !== -1) {
    Images[existingEntryIndex].images.push({ path, file });
  } else {
    Images.push({ canvasId, images: [{ path, file }] });
  }
}


