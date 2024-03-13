import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './schemas/notes.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Notes.name)
        private notesModel : mongoose.Model<Notes>
    ){}

    async findAll(): Promise<Notes[]>{
        const notes= await this.notesModel.find()
        return notes
    }

    async create(notes: Notes): Promise<Notes> {
        const res= await this.notesModel.create(notes)
        return res
    }

    async findById(id: string): Promise<Notes> {
        const notes= await this.notesModel.findById(id)
        // if(!notes){
        //     console.log('ggg');
            
        //     throw new NotFoundException('Book not found.')
        // }
        return notes;
    }

    async updateById(id: string, notes: Notes): Promise<Notes> {
        return await this.notesModel.findByIdAndUpdate(id, notes ,{
            new:true,
            runValidators:true,
        } )
      
      
    }
}

