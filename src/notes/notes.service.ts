import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './schemas/notes.schema';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';

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

    async create(notes: Notes, user: User): Promise<Notes> {
        const data= Object.assign(notes, {user: user._id})
        const res= await this.notesModel.create(notes)
        return res
    }

    async findById(id: string): Promise<Notes> {
        const isValidId= mongoose.isValidObjectId(id);

        if(!isValidId){
            throw new BadRequestException('Please enter correct id.')
        }

        const notes= await this.notesModel.findById(id)
        if(!notes){
            throw new NotFoundException('Book not found.')
        }
        return notes;
    }

    async updateById(id: string, notes: Notes): Promise<Notes> {
        return await this.notesModel.findByIdAndUpdate(id, notes ,{
            new:true,
            runValidators:true,
        } ) 
    }

    async deleteById(id: string): Promise<Notes> {
        return await this.notesModel.findByIdAndDelete(id) 
    }
}

