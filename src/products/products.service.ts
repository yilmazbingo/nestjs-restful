import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async insertProduct(title: string, description: string, price: number) {
    //   ts infers that we are returning prodId which is string. so it already infers that this func returns string
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }
  async getProducts() {
    const result = await this.productModel.find();
    return [...result];
  }

  async getSingleProduct(productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('invalid credentials');
    }
    console.log('product', product);
    return { product };
  }
  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price,
      },
      { useFindAndModify: false },
    );
    console.log('product', product);
    return { product };
  }

  async deleteProduct(id: string) {
    const product = this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException('invalid credentials');
    }
    return { ...product };
  }
}
