import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Artist as ArtistModel, ArtistDocument } from './artist.schema';
import { IArtist} from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { ArtistDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ArtistService {
    private readonly logger: Logger = new Logger(ArtistService.name);

    constructor(
        @InjectModel(ArtistModel.name) private artistModel: Model<ArtistDocument>
    ) {}

    async findAll(): Promise<IArtist[]> {
        this.logger.log(`Finding all items`);
        const items = await this.artistModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IArtist | null> {
        this.logger.log(`finding artist with id ${_id}`);
        const item = await this.artistModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async create(artist: ArtistDto): Promise<IArtist> {
        this.logger.log(`Create artist ${artist.name}`);
        const createdItem = this.artistModel.create(artist);
        return createdItem;
    }

    async update(_id: string, artist: ArtistDto): Promise<IArtist | null> {
        this.logger.log(`Update artist ${artist.name}`);
        return this.artistModel.findByIdAndUpdate({ _id }, artist);
    }

    async delete(_id: string): Promise<IArtist | null> {
        this.logger.log(`Deleted artist with id ${_id}`);
        return this.artistModel.findByIdAndDelete({ _id });
    }
}
