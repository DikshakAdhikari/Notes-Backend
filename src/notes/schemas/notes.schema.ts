import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})

export class Notes {
    
    @Prop()
    title: String;

    @Prop()
    description: String;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);