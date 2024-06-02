import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { PaginationFilterDto } from 'src/common/dtos/paginationFilter.dto';

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

    async findAll(paginationFilterDto: PaginationFilterDto): Promise<Feedback[]> {
        const { limit = 5, offset = 0, category, status } = paginationFilterDto;

        const query = this.feedbackRepository.createQueryBuilder('feedback');

        if (status) 
            query.andWhere('feedback.status = :status', { status });
    
        if (category) 
            query.andWhere('feedback.category = :category', { category });

        query.skip(offset).take(limit);

        return await query.getMany();
    }

    async findOne(id: string) {
        const feedback = await this.feedbackRepository.findOneBy({ id });
        if (!feedback) throw new NotFoundException('Feedback not found');

        return feedback;
    }

    update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
        return `This action updates a #${id} feedback`;
    }

    async remove(id: string) {
        const feedback = await this.feedbackRepository.findOneBy({ id });
        if (!feedback) throw new NotFoundException('Feedback not found');

        await this.feedbackRepository.remove(feedback);

        return 'Feedback deleted successfully';
    }

    private handleDBException(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail);

        this.logger.error(error);
        throw new InternalServerErrorException('Error creating feedback');
    }
}
