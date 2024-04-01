import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {}

    async getAllProducts(): Promise<Product[]>{
        return await this.productModel.find().exec();
    }

    async createProduct(product: any): Promise<Product> {
        console.log('the product is created');
        return new this.productModel(product).save();
    }


}
