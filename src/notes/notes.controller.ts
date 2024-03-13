import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from './schemas/notes.schema';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get()
    async getAllNotes(): Promise<Notes[]> {
        return this.notesService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard())
    async createNotes(
        @Body()
        notes: CreateNotesDto,
        @Req() req,
    ): Promise<Notes> {
        
        return this.notesService.create(notes, req.user);
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

    @Delete(':id')
    async deleteNotes(
        @Param('id')
        id:string
    ): Promise<Notes> {
        return this.notesService.deleteById(id)
    }
}


