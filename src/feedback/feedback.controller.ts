import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PaginationFilterDto } from 'src/common/dtos/paginationFilter.dto';
import { Feedback } from './entities/feedback.entity';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }

    @Post()
    create(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.create(createFeedbackDto);
    }

    @Get()
    findAll(
        @Query() paginationFilterDto: PaginationFilterDto,
    ): Promise<Feedback[]> {
        return this.feedbackService.findAll(paginationFilterDto);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<Feedback> {
        return this.feedbackService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
        return this.feedbackService.update(+id, updateFeedbackDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.feedbackService.remove(id);
    }
}
