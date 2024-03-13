import { IsOptional, IsString } from "class-validator"


export class UpdateNotesDto {

    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly description: string
}