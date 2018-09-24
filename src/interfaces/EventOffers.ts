import IAPIError from "@/interfaces/IAPIError";

interface IWithData<I> {
  data: I[];
}

interface IAreaAttributes {
  description: string;
}

interface IOfferAttributes {
  description: string;
}

interface IPriceAttributes {
  value: string;
  currency: string;
}

interface IEmbedded {
  areas: IWithData<IArea[]>;
}

export interface IPrice {
  attributes: IPriceAttributes;
  relationships: any;
}

export interface IOffer {
  attributes: IOfferAttributes;
}

export interface IArea {
  attributes: IAreaAttributes;
}

export default interface IEventOffers {
  offers: IOffer[];
  prices: IWithData<IPrice[]>;
  _embedded: IEmbedded;
  errors?: IAPIError[];
}
