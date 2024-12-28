import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  content: string;

  @Max(5)
  @Min(1)
  rating: number;

  // @IsOptional()
  // @IsUUID(4, { message: 'must be a valid UUID for a User' })
  // reviewerId: string;
}

export class CreateSellerReviewDto extends CreateReviewDto {
  @IsUUID(4, { message: 'must be a valid UUID for a Seller' })
  sellerId: string;
}

export class CreateListingReviewDto extends CreateReviewDto {
  @IsUUID(4, { message: 'must be a valid UUID for a Listing' })
  listingId: string;
}
