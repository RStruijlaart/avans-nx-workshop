import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Concert as ConcertModel, ConcertDocument } from './concert.schema';
import { IConcert} from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { ConcertDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ConcertService {
    private readonly logger: Logger = new Logger(ConcertService.name);

    constructor(
        @InjectModel(ConcertModel.name) private concertModel: Model<ConcertDocument>
    ) {}

    async findAll(): Promise<IConcert[]> {
        this.logger.log(`Finding all items`);
        const items = await this.concertModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IConcert | null> {
        this.logger.log(`finding concert with id ${_id}`);
        const item = await this.concertModel.findOne({ _id }).populate('artists').exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async create(concert: ConcertDto): Promise<IConcert> {
        this.logger.log(`Create concert ${concert.name}`);
        const createdItem = this.concertModel.create(concert);
        return createdItem;
    }

    async update(_id: string, concert: ConcertDto): Promise<IConcert | null> {
        this.logger.log(`Update concert ${concert.name}`);
        return this.concertModel.findByIdAndUpdate({ _id }, concert);
    }

    async delete(_id: string): Promise<IConcert | null> {
        this.logger.log(`Deleted concert with id ${_id}`);
        return this.concertModel.findByIdAndDelete({ _id });
    }
}