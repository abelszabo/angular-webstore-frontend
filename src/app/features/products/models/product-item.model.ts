import {Product} from './product.model';

export class ProductItemModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public categoryName: string
  ) {}

  static fromDto(p: Product): ProductItemModel {
    return new ProductItemModel(
      p.id,
      p.name,
      p.description,
      p.price,
      p.categoryName
    );
  }

  get formattedPrice(): string {
    return `${this.price} Ft`;
  }
}
