import { Injectable } from '@nestjs/common';
import { FakeRepo } from './FakeRepo';

@Injectable()
export class MbinuStoreService {
  readProfile() {
    return {
      msg: 'My Profile',
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          mobile: '+1234567890',
          city: 'New York',
          shippingAddress: '123 Main St, Apt 4B',
          email: 'john.doe@example.com',
          createdAt: '2024-03-13T12:00:00Z',
          updatedAt: '2024-03-13T14:30:00Z',
        },
      ],
    };
  }

  async completeProfile(_profileCompletionDto: any) {
    return this.readProfile();
  }

  categories() {
    return {
      msg: 'Categories',
      data: FakeRepo.categories.map((cat) => ({
        ...cat,
        // categoryImg: 'http://127.0.0.1:8000/shoe.png',
        categoryImg: 'http://10.0.2.2:8000/shoe.png',
      })),
    };
  }

  index(_remark: string) {
    return {
      msg: 'Index',
      data: FakeRepo.products.map((cat) => ({
        ...cat,
        // image: 'http://127.0.0.1:8000/shoe.png',
        image: 'http://10.0.2.2:8000/shoe.png',
      })),
    };
  }

  cart() {
    return {
      msg: 'Cart Items',
      data: FakeRepo.products.slice(0, 4).map((product, index) => ({
        id: index + 1,
        email: 'product@cart.mbinu.com',
        productId: product.id,
        color: '#61FA61',
        size: 'Medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        product,
        quantity: 1,
      })),
    };
  }

  homeFeed() {
    return {
      msg: 'Home Feed',
      data: FakeRepo.feed.map((f) => ({
        ...f,
        // image: `http://127.0.0.1:8000/feed${f.id}.jpg`,
        image: `http://10.0.2.2:8000/feed${f.id}.jpg`,
      })),
    };
  }
}
