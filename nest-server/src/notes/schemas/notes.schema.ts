import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";



@Schema({
    timestamps: true
})

export class Notes {
    
    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:"User"})
    user: User
}

export const NotesSchema = SchemaFactory.createForClass(Notes);