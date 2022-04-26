import {UserSchema, User} from './user.schema';
import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersController} from './users.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
