import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUserInfo, IUser, ITicket } from '@avans-nx-workshop/shared/api';
import { CreateTicketDto, CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { UserExistGuard } from './user-exists.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<IUserInfo[]> {
        return this.userService.findAll();
    }

    // this method should precede the general getOne method, otherwise it never matches
    // @Get('self')
    // async getSelf(@InjectToken() token: Token): Promise<IUser> {
    //     const result = await this.userService.getOne(token.id);
    //     return result;
    // }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.findOne(id);
    }

    @Post('')
    @UseGuards(UserExistGuard)
    create(@Body() user: CreateUserDto): Promise<IUserInfo> {
        return this.userService.create(user);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Promise<IUserInfo | null> {
        return this.userService.update(id, user);
    }
    
    @Delete(':id')
    delete(
        @Param('id') id: string,
    ): Promise<IUserInfo | null> {
        return this.userService.delete(id);
    }

    @Post(':id/tickets')
    addTicket(
        @Param('id') id: string,
        @Body() ticket: CreateTicketDto
    ): Promise<IUserInfo | null> {
        return this.userService.addTicket(id, ticket);
    }

    @Delete(':id/tickets/:ticketId')
    removeTicket(
        @Param('id') id: string,
        @Param('ticketId') ticketId: string
    ): Promise<IUserInfo | null> {
        return this.userService.removeTicket(id, ticketId);
    }

    @Get(':id/hasTicketFor/:concertId')
    async hasBoughtTicketForConcert(
        @Param('id') id: string,
        @Param('concertId') concertId: string
    ): Promise<boolean | null> {
        return this.userService.hasBoughtTicketForConcert(id, concertId);
    }
}
