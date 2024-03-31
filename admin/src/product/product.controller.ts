import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    async allProducts() {
        return this.productService.allProductService();
    }

    @Post()
    async createProduct(
        @Body('title') title: string,
        @Body('image') image: string) {
        return this.productService.createProductService({title, image});
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
        return this.productService.updateProductByIdService(id, {title, image});
    }

    @Delete(':id')
    async deleteProductById(@Param('id') id: number) {
        return this.productService.deleteProductByIdService(id);
    }

}
