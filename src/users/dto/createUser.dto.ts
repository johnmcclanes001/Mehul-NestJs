import { IsEnum, IsNotEmpty, IsString, IsEmail} from 'class-validator'


enum Role {
    Admin,
    User
}

export default class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    name: String
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email : String

    @IsEnum(['Admin','User'], {message:'Invalid Role is given.'})
    role : Role
}


