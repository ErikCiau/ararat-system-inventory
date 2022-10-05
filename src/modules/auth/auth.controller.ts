import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignOnItentDTO } from './dtos/sign-on-intent.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-on')
  signOnIntent(@Body() signOnIntent: SignOnItentDTO) {
    return this.authService.SignOn(signOnIntent);
  }

  @UseGuards(LocalGuard)
  @Post('sign-in')
  signInIntent(@Req() req: any) {
    return this.authService.logIn(req.user);
  }
  @UseGuards(JwtGuard)
  @Get('me')
  whoAmI(@Req() req: any) {
    return this.authService.getMyProfile(req.user.id);
  }
}
