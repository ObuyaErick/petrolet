import { IsEnum, IsNotEmpty, IsPositive, Max, min, Min } from 'class-validator';

export enum EngineTransmission {
  Automatic = 'Automatic',
  Manual = 'Manual',
}

export enum FuelType {
  Diesel = 'Diesel',
  Super = 'Super',
}

export enum VehicleCondition {
  Used = 'Used',
  New = 'New',
}

export class CreateListingDto {
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'price is required' })
  price: number;

  @IsNotEmpty({ message: 'location is required' })
  location: string;

  @IsNotEmpty({ message: 'make is required' })
  make: string;

  @IsNotEmpty({ message: 'model is required' })
  model: string;

  @IsPositive()
  @Min(1990)
  @Max(new Date().getFullYear())
  year: number;

  @IsNotEmpty({ message: 'mileage is required' })
  @IsPositive()
  mileage: number;

  @IsEnum(EngineTransmission)
  transmission: string;

  @IsEnum(FuelType)
  fuelType: string;

  @IsEnum(VehicleCondition)
  condition: string;

  color: string;
}

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
