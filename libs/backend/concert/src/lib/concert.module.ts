import { Module } from '@nestjs/common';
import { ConcertController } from './concert/concert.controller';
import { Concert, ConcertSchema } from './concert/concert.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertService } from './concert/concert.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Concert.name, schema: ConcertSchema }
        ])
    ],
    controllers: [ConcertController],
    providers: [ConcertService],
    exports: [ConcertService]
})
export class ConcertModule {}
