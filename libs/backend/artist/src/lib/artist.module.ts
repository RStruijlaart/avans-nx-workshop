import { Module } from '@nestjs/common';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist/artist.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema }
            // { name: Meal.name, schema: MealSchema },
        ])
    ],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService]
})
export class ArtistModule {}
