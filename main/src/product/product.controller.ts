import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { title } from 'process';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService,
        private httpService: HttpService) {}

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.findOne(id);

        this.httpService.post(`http://localhost:8000/api/products/${id}/like`, {})
        .subscribe((response) => {
            console.log(response);
        });

        return await this.productService.updateProduct(id, {
            likes: product.likes + 1,
        })
        
    }

    @EventPattern('product_created')
    async createProduct(product: any) {
        const products = await this.productService.createProduct({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
    }

    @EventPattern('product_updated')
    async updateProduct(product: any) {
        const products = await this.productService.updateProduct(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,
        });
    }

    @EventPattern('product_deleted')
    async deleteProduct(id: number) {
        console.log('Deleted product with id: ', id)
        const products = await this.productService.deleteProduct(id);
    }
}
