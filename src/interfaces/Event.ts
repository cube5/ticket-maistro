export interface IPriceRange {
  min: number;
  max: number;
  type: string;
  currency: string;
}

export default interface IEvent {
  id: string;
  name: string;
  info?: string;
  dates?: any;
  images: any[];
  locale?: string;
  pleaseNote?: string;
  priceRanges?: IPriceRange[];
  _links?: any;
  _embedded?: any;
}
