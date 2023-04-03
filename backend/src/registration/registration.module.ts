import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationController } from '../registration/registration.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { VerifySignup } from './middleware/verifySignup.middleware copy';
import { UsersModule } from 'src/users/users.module';
import { VerifyHelper } from 'src/users/middleware/verifyHelper';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RegistrationController],
  providers: [UsersService, VerifyHelper],
})
export class RegistrationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifySignup)
      .forRoutes({ path: 'registration', method: RequestMethod.POST });
  }
}
