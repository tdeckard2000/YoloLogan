import { ObjectId } from "mongodb";

export interface ContactInfo {
  business: string,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  hideEmail: boolean,
  hidePhone: boolean,
  hideName: boolean
};

export interface EventInfo {
  title: string,
  date: Date,
  description: string,
  eventUrl: string,
  imageURL: string,
  properties: Array<string>,
  address: {
    coordLat: number,
    coordLng: number,
    city: string,
    state: string,
    streetNumber: string,
    street: string,
    zip: string,
  },
}

export interface EventObject extends EventInfo{
  _id: ObjectId
  contactInfo: ContactInfo
};


export interface FilterObject {
  kidFriendly: boolean,
  adultsOnly: boolean,
  freeEvent: boolean,
  paidEvent: boolean,
  oneTimeEvent: boolean,
  weeklyEvent: boolean,
  monthlyEvent: boolean,
  dogFriendly: boolean,
  catFriendly: boolean,
  coffee: boolean,
  noCoffee: boolean,
  alcohol: boolean,
  noAlcohol: boolean,
  outdoors: boolean,
  indoors: boolean
}
