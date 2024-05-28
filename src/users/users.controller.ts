import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/createUser.dto';
@Controller('users')
export class UsersController {
    constructor(readonly userService : UsersService){}
    @Get()
    findAll(@Query('role') role: 'Admin' | 'Deve') {
        return this.userService.findAll(role);
    }

    @Post()
    createUser(@Body(ValidationPipe) createUserDto : CreateUserDto){
        return createUserDto;
    }
    
}
