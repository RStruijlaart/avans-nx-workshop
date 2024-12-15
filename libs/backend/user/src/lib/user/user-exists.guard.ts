import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Observable } from 'rxjs';

@Injectable()
export class UserExistGuard implements CanActivate {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.body;

        const userExists = await this.doesUserExist(user);
        if (userExists) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'User with that email already exists',
                    error: 'Bad Request',
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return true;
    }

    private async doesUserExist(user: any): Promise<boolean> {
        const existingUser = await this.userModel.findOne({ emailAddress: user.emailAddress });
        
        if(existingUser){
            return true;
        }
        return false;
    }
    
}

@Injectable()
export class UserExistUpdateGuard implements CanActivate {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.body;

        const userExists = await this.doesUserExist(user);
        console.log(userExists);
        if (userExists) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'User with that email already exists',
                    error: 'Bad Request',
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return true;
    }

    private async doesUserExist(user: any): Promise<boolean> {
        const existingUser = await this.userModel.findOne({ emailAddress: user.emailAddress });
        const oldUserInfo = await this.userModel.findOne({ _id: user._id });

        if(existingUser && oldUserInfo && oldUserInfo.emailAddress == user.emailAddress){
            return false;
        }else if(!existingUser){
            return false;
        }
        return true
    }
    
}