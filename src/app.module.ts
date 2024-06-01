import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: envs.db.host,
            port: envs.db.port,
            database: envs.db.name,
            username: envs.db.user,
            password: envs.db.password,
            autoLoadEntities: true,
            synchronize: true,
        }),
        FeedbackModule
    ],
})
export class AppModule { }
