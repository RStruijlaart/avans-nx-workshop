import { Module } from '@nestjs/common';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist/artist.schema';
import { Concert, ConcertSchema } from '@avans-nx-workshop/backend/concert';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Artist.name, schema: ArtistSchema },
            { name: Concert.name, schema: ConcertSchema }
        ])
    ],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService]
})
export class ArtistModule {}
