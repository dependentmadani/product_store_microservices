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
        return this.productModel.find();
    }

    async createProduct(product: any): Promise<Product> {
        return new this.productModel(product).save();
    }

    async updateProduct(id: number, product: any): Promise<any> {
        return this.productModel.findOneAndUpdate({id}, product);
    }

    async findOne(id:number): Promise<Product> {
        return this.productModel.findOne({id});
    }

    async deleteProduct(id: number): Promise<void> {
        this.productModel.deleteOne({id});
    }
}
