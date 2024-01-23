// ppt-to-json.d.ts

declare module 'ppt-to-json' {
  interface SlideElement {
    // Define the structure of SlideElement based on the actual structure used by ppt-to-json
    // For example:
    type: string;
    text?: string;
    x?: number;
    y?: number;
    readPath: any;

    // Add other properties as needed
  }

  interface Slide {
    elements: SlideElement[];
    // Add other properties as needed
  }

  interface PptToJsonResult {
    slides: Slide[];

    // Add other properties as needed
  }

  function toJson(path: string): Promise<PptToJsonResult>;

  // You might need to add other functions or types based on the actual usage of ppt-to-json
}
