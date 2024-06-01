import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FeedbackCategory, FeedbackStatus } from "src/common/enums";

export class CreateFeedbackDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(FeedbackCategory)
    category: FeedbackCategory;

    @IsEnum(FeedbackStatus)
    @IsOptional()
    status?: FeedbackStatus;
}
