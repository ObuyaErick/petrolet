export type Status = 'draft' | 'review' | 'published';

export class Seller {
  id: number;
  createdAt: number;
  status: Status;

  constructor(id: number, createdAt: number, status: Status) {
    this.id = id;
    this.createdAt = createdAt;
    this.status = status;
  }
}
