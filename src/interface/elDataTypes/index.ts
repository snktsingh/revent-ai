export interface TimelineDataType {
  content: string;
  id: string;
}
export interface BulletPointsFunctionType {
  mainBulletPoints: string[];
  nestedBulletPoints: { [key: string]: string[] };
}
