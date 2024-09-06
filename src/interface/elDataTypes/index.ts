export interface TimelineDataType {
  content: string;
  id: string;
}
export interface HunNSpokeDataType {
  content: string;
  id: string;
}
export interface StatisticsDataType {
  content: string;
  id: string;
}
export interface BulletPointsFunctionType {
  mainBulletPoints: string[];
  nestedBulletPoints: { [key: string]: string[] };
}

export interface IElementStyles {
  cover: string | null;
  tableOfContents: string | null;
  paragraph: string | null;
  bullet: string | null;
  section: string | null;
  images: string | null;
  quote: string | null;
  statistics: string | null;
  teamList: string | null;
  clientList: string | null;
  cycle: string | null;
  process: string | null;
  timeline: string | null;
  funnel: string | null;
  pyramid: string | null;
  swot: string | null;
  hubsAndSpoke: string | null;
  conclusion: string | null;
}
