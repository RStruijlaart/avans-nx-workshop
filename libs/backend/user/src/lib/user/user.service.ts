import { ConflictException, HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserModel, UserDocument } from './user.schema';
import { IUser, IUserInfo } from '@avans-nx-workshop/shared/api';
// import { Meal, MealDocument } from '@avans-nx-workshop/backend/features';
import { CreateTicketDto, CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { catchError } from 'rxjs';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UserService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument> // @InjectModel(Meal.name) private meetupModel: Model<MealDocument>
    ) {}

    async findAll(): Promise<IUserInfo[]> {
        this.logger.log(`Finding all items`);
        const items = await this.userModel.find();
        return items;
    }

    async findOne(_id: string): Promise<IUser | null> {
        this.logger.log(`finding user with id ${_id}`);
        const item = await this.userModel.findOne({ _id })
        .populate({
            path: 'tickets.concert',
            model: 'Concert',
        }).exec();
        if (!item) {
            this.logger.debug('Item not found');
        }
        return item;
    }

    async findOneByEmail(email: string): Promise<IUserInfo | null> {
        this.logger.log(`Finding user by email ${email}`);
        const item = this.userModel
            .findOne({ emailAddress: email })
            .select('-password')
            .exec();
        return item;
    }

    async create(user: CreateUserDto): Promise<IUserInfo> {
        this.logger.log(`Create user ${user.name}`);
        const createdItem = this.userModel.create(user);
        return createdItem;
    }

    async update(_id: string, user: UpdateUserDto): Promise<IUserInfo | null> {
        this.logger.log(`Update user ${user.name}`);
        return this.userModel.findByIdAndUpdate({ _id }, user);
    }

    async delete(_id: string): Promise<IUserInfo | null> {
        this.logger.log(`Deleted user with id ${_id}`);
        return this.userModel.findByIdAndDelete({ _id });
    }

    async addTicket(userId: string, newTicket: CreateTicketDto): Promise<IUserInfo | null> {

        return this.hasBoughtTicketForConcert(userId, newTicket.concert)
        .then((alreadyHasTicket: boolean) => {
            if(alreadyHasTicket == true){
                throw new ConflictException("Already has ticket to this concert");
            }else{
                return this.userModel.findByIdAndUpdate(
                    { _id: userId },
                    { $push: { tickets: newTicket } }
                );
            }
        }).catch((err: any) => {
            return err;
        })

        
    }

    async removeTicket(userId: string, ticketId: string): Promise<IUserInfo | null> {
        console.log("Deleted ticket")
        console.log(userId);
        console.log(ticketId);
        return this.userModel.findByIdAndUpdate(
            { _id: userId },
            { $pull: { tickets: {concert: ticketId} } }
        ).exec();
    }

    async hasBoughtTicketForConcert(userId: string, concertId: string): Promise<boolean> {
        try {
            const user = await this.findOne(userId);
    
            if (!user) {
                throw new ConflictException("User not found");
            }
            
            console.log(user.tickets.some(ticket => ticket.concert._id == concertId))
            return user.tickets.some(ticket => ticket.concert._id == concertId);
        } catch (error) {
            throw error;
        }
    }
}
