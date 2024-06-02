import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive, Min } from "class-validator";
import { FeedbackCategory, FeedbackStatus } from "../interfaces/enums";

export class PaginationFilterDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;
    
    @IsOptional()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @IsOptional()
    @IsEnum(FeedbackCategory)
    category?: FeedbackCategory;
    
    @IsOptional()
    @IsEnum(FeedbackStatus)
    status?: FeedbackStatus;
}