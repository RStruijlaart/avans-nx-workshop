import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Artist as ArtistModel, ArtistDocument } from './artist.schema';
import { Concert as ConcertModel, ConcertDocument } from '@avans-nx-workshop/backend/concert';
import { IArtist, IConcert, IFindArtistIdArray} from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { ArtistDto } from '@avans-nx-workshop/backend/dto';
import { error } from 'console';
import {
    ConflictException
} from '@nestjs/common/exceptions';

@Injectable()
export class ArtistService {
    private readonly logger: Logger = new Logger(ArtistService.name);

    constructor(
        @InjectModel(ConcertModel.name) private concertModel: Model<ConcertDocument>,
        @InjectModel(ArtistModel.name,) private artistModel: Model<ArtistDocument>
    ) {}

    async findAll(): Promise<IArtist[]> {
        this.logger.log(`Finding all items`);
        const items = await this.artistModel.find();
        return items;
    }

    async findArtistsWithId(body: IFindArtistIdArray): Promise<IArtist[]> {
        this.logger.log(`Finding all items`);
        const items = await this.artistModel.find({ _id: { $in: body.artistIds } });
        return items;
    }

    async findAllConcertsForArtist(_id: string): Promise<IConcert[]> {
        this.logger.log(`Finding all concerts for artist with id ${_id}`);
        const items = await this.concertModel.find({artists: _id});
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

        return await this.findAllConcertsForArtist(_id)
        .then((concerts: IConcert[]) => {
            if (concerts.length > 0) {
                this.logger.log("Artist with concerts can't be deleted!");
                throw new ConflictException("Artist with concerts can't be deleted!");
            } else {
                this.logger.log(`Deleted artist with id ${_id}`);
                return this.artistModel.findByIdAndDelete({ _id });
            }
        })
        .catch((error: any) => {
            return error;
        });
    }

}
