import { IsNotEmpty, IsString } from "class-validator"


export class CreateNotesDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string
}