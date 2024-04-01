import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { title } from 'process';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @EventPattern('product_created')
    async createProduct(product: any) {
        const products = await this.productService.createProduct({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
        console.log('product info:', products);
    }
}
