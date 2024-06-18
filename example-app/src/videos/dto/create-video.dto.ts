import { IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateVideoDto {
    @IsNotEmpty()
    @Length(1,15)
    title: string;
    description: string;
    @IsUrl()
    src: string;
}
