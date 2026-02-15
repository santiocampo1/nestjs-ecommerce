export class ProductActivatedEvent {
  constructor(
    public readonly productId: number,
    public readonly merchantId: number,
    public readonly code: string,
    public readonly title: string,
  ) {}
}