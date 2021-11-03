export interface EventObject {
  _id: string,
  title: string,
  contactEmail: string,
  contactPhone: string,
  contactName: string,
  date: Date,
  description: string,
  eventUrl: string,
  imageURL: string,
  properties: Array<string>,
  address: {
    city: string,
    state: string,
    street: string,
    zip: string,
    businessName: string
  };
};


