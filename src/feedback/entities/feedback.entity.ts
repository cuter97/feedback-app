import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FeedbackCategory, FeedbackStatus } from "src/common/enums";

@Entity('feedback')
export class Feedback {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true
    })
    title: string;
    
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'enum',
        enum: FeedbackCategory,
        default: FeedbackCategory.FEATURE
    })
    category: FeedbackCategory;

    @Column({
        type: 'enum',
        enum: FeedbackStatus,
        default: FeedbackStatus.PLANNED
    })
    status: FeedbackStatus;
}