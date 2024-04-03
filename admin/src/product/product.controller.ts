import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) {}

    @Get()
    async allProducts() {
        return this.productService.allProductService();
    }

    @Post()
    async createProduct(
        @Body('title') title: string,
        @Body('image') image: string) {
        
        const product = await this.productService.createProductService({title, image});
        this.client.emit('product_created', product);
        return product;
    }

    @Get(':id')
    async getProductById(@Param('id') id: number) {
        
        return this.productService.getProductByIdService(id);
    }

    @Put(':id')
    async updateProductById(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('image') image: string) {
        
        await this.productService.updateProductByIdService(id, {title, image});
        const product = await this.productService.getProductByIdService(id);
        this.client.emit('product_updated', product);
        return product;
    }

    @Delete(':id')
    async deleteProductById(@Param('id') id: number) { 
        
        await this.productService.deleteProductByIdService(id);
        this.client.emit('product_deleted', id);
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.getProductByIdService(id);

        return await this.productService.updateProductByIdService(id, {
            likes: product.likes + 1,
        })
        
    }

}
