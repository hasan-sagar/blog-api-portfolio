import { Controller, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/jwt-roles/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('registration/:to/:name')
  async UserRegisrationOtpSend(@Param('to') to: string, @Param('name') name:string) : Promise<any> {
    return this.authService.UserRegisrationOtpSend(to,name);
  }

  @Get('register/verify-otp/:to/:name/:otp')
  async UserRegisterAndOtpVerify(
    @Param('to') to: string,
    @Param('name') name: string,
    @Param('otp') otp: string,
  ): Promise<any> {
    return this.authService.UserRegisterAndOtpVerify(to, name, otp);
  }

  @Get('login/:to')
  async UserLoginOtpSend(@Param('to') to: string): Promise<any> {
    return this.authService.UserLoginOtpSend(to)
  }

  @Get('login/verify-otp/:to/:otp')
  async UserLoginOtpVerify(@Param('to') to: string, @Param('otp') otp: string): Promise<any> {
    return this.authService.UserLoginOtpVerify(to, otp)
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@User() user: any) {
    return this.authService.getUser(user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(){
    throw new UnauthorizedException()
  }
}
