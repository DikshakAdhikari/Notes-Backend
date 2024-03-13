import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from './schemas/notes.schema';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get()
    async getAllNotes(): Promise<Notes[]> {
        return this.notesService.findAll()
    }

    @Post()
    async createNotes(
        @Body()
        notes: CreateNotesDto
    ): Promise<Notes> {
        return this.notesService.create(notes);
    }

    @Get(':id')
    async getNotes(
        @Param('id')
        id:string
    ): Promise<Notes> {
        return this.notesService.findById(id)
    }

    @Put(':id')
    async updateNotes(
        @Param('id')
        id:string,
        @Body()
        notes: UpdateNotesDto
    ): Promise<Notes> {
        return this.notesService.updateById(id, notes)
    }
}


