import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

type ProductCreation = {
    title: string;
    image: string;
}

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async allProductService(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async createProductService(data: ProductCreation): Promise<Product> {
        return this.productRepository.save(data);
    }

    async getProductByIdService(ProductId: number): Promise<Product> {
        return this.productRepository.findOne({ where: {id: ProductId} });
    }

    async updateProductByIdService(ProductId: number, data: any): Promise<any> {
        return this.productRepository.update(ProductId, data);
    }

    async deleteProductByIdService(ProductId: number): Promise<any> {
        return this.productRepository.delete(ProductId);
    }
}
