import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { User } from "../../auth/schemas/user.schema"

export class UpdateNotesDto {

    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsEmpty({message:"You cannot pass user id"})
    readonly user: User
}
