export class CreateListingDto {}

//   make: 'Hyundai,Porsche,Hyundai,Nissan';
//   transmission: 'Automatic';
//   condition: 'New';
//   color: 'Red,White,Black';
//   year: '2020-';
//   mileage: '67-98';
//   price: '-0567';

export interface ListingFilters {
  make?: string;
  transmission?: string;
  condition?: string;
  color?: string;
  year?: string;
  mileage?: string;
  price?: string;
}
