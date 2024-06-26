import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';

@Module({
    controllers: [FeedbackController],
    providers: [FeedbackService],
    imports: [
        TypeOrmModule.forFeature([Feedback]),
    ]
})
export class FeedbackModule { }
