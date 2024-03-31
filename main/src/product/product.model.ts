import { Prop } from "@nestjs/mongoose";
import { Schema } from "mongoose";

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

export const ProductSchema = new Schema(Product, {autoCreate: true});