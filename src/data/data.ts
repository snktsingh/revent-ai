import { listObjType } from '@/interface/storeTypes';


interface ImageData {
  id : number,
  imageFile: any;
}

interface ListImagesEntry {
  canvasId: number;
  images: ImageData[];
}

export const listImages: ListImagesEntry[] = [];


export function addOrReplaceTeamListImage(canvasId: number, id: number, imageFile: any): void {
  const entry = listImages.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images[imageIndex].imageFile = imageFile;
    } else {
      entry.images.push({ id, imageFile });
    }
  } else {
    listImages.push({ canvasId, images: [{ id, imageFile }] });
  }
}

export function deleteTeamListImage(canvasId: number, id: number): void {
  const entry = listImages.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images.splice(imageIndex, 1);
    } else {
      console.warn(`Image with id ${id} not found in canvasId ${canvasId}.`);
    }
  } else {
    console.warn(`Canvas with id ${canvasId} not found.`);
  }
}

//IMAGE ELEMENT
export const Images: {
    canvasId: number;
    images: ImageData[];
  }[] = [];


export function addOrReplaceImage(canvasId: number, id: number, imageFile: any): void {
  const entry = Images.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images[imageIndex].imageFile = imageFile;
    } else {
      entry.images.push({ id, imageFile });
    }
  } else {
    Images.push({ canvasId, images: [{ id, imageFile }] });
  }
}

export function deleteImage(canvasId: number, id: number): void {
  const entry = Images.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images.splice(imageIndex, 1);
    } else {
      console.warn(`Image with id ${id} not found in canvasId ${canvasId}.`);
    }
  } else {
    console.warn(`Canvas with id ${canvasId} not found.`);
  }
}

//QUOTE ELEMENT
export const QuoteImages: {
    canvasId: number;
    images: ImageData[];
  }[] = [];

export function addOrReplaceQuoteImage(canvasId: number, id: number, imageFile: any): void {
  const entry = QuoteImages.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images[imageIndex].imageFile = imageFile;
    } else {
      entry.images.push({ id, imageFile });
    }
  } else {
    QuoteImages.push({ canvasId, images: [{ id, imageFile }] });
  }
}

export function deleteQuoteImage(canvasId: number, id: number): void {
  const entry = QuoteImages.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images.splice(imageIndex, 1);
    } else {
      console.warn(`Image with id ${id} not found in canvasId ${canvasId}.`);
    }
  } else {
    console.warn(`Canvas with id ${canvasId} not found.`);
  }
}

//CLIENT LIST
export const clientListImages: ListImagesEntry[] = [];


export function addOrReplaceClientListImage(canvasId: number, id: number, imageFile: any): void {
  const entry = clientListImages.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images[imageIndex].imageFile = imageFile;
    } else {
      entry.images.push({ id, imageFile });
    }
  } else {
    clientListImages.push({ canvasId, images: [{ id, imageFile }] });
  }
}

export function deleteClientListImage(canvasId: number, id: number): void {
  const entry = clientListImages.find(entry => entry.canvasId === canvasId);
  if (entry) {
    const imageIndex = entry.images.findIndex(img => img.id === id);
    if (imageIndex !== -1) {
      entry.images.splice(imageIndex, 1);
    } else {
      console.warn(`Image with id ${id} not found in canvasId ${canvasId}.`);
    }
  } else {
    console.warn(`Canvas with id ${canvasId} not found.`);
  }
}