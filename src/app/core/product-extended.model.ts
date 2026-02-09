import {Product} from './product.model';

export class ExtendedProductModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public categoryName: string
  ) {}

  static fromDto(p: Product): ExtendedProductModel {
    return new ExtendedProductModel(
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
