import { Prop } from "@nestjs/mongoose";
import { Schema, Document, model } from "mongoose";

export class Product {
    @Prop()
    id: number;
    
    @Prop()
    title: string;
    
    @Prop()
    image: string;
    
    @Prop()
    likes: string;
}

export interface ProductDocument extends Document {
    id: number;
    title: string;
    image: string;
    likes: string;
}

export const ProductSchema = new Schema(Product, {autoCreate: true});

export const ProductModel = model<ProductDocument>('Product', ProductSchema);