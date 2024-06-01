import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {

    private readonly logger = new Logger('FeedbackService');

    constructor(
        @InjectRepository(Feedback)
        private readonly feedbackRepository: Repository<Feedback>,
    ) { }

    async create(createFeedbackDto: CreateFeedbackDto) {
        try {
            const feedback = this.feedbackRepository.create(createFeedbackDto);
            await this.feedbackRepository.save(feedback);
            return feedback;
        } catch (error) {
            this.handleDBException(error);
        }
    }

    findAll() {
        return `This action returns all feedback`;
    }

    findOne(id: number) {
        return `This action returns a #${id} feedback`;
    }

    update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
        return `This action updates a #${id} feedback`;
    }

    remove(id: number) {
        return `This action removes a #${id} feedback`;
    }

    private handleDBException(error: any) {
        if (error.code === '23505') 
            throw new BadRequestException(error.detail);
        
        this.logger.error(error);
        throw new InternalServerErrorException('Error creating feedback');
    }
}
