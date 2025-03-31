import { injectable, inject } from 'inversify';
import { PrismaDB } from '../db/index';
import { UserDto } from './user.dto';
import { plainToClass } from 'class-transformer'; //dto验证
import { validate } from 'class-validator'; //dto验证

@injectable()
export class UserService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}
  public async getList() {
    return await this.PrismaDB.prisma.user.findMany();
  }
  public async createUser(data: UserDto) {
    const user = plainToClass(UserDto, data);
    const errors = await validate(user);
    const dto = [];
    if (errors.length) {
      errors.forEach((error) => {
        Object.keys(error.constraints).forEach((key) => {
          dto.push({
            [error.property]: error.constraints[key],
          });
        });
      });
      return dto;
    } else {
      const userInfo = await this.PrismaDB.prisma.user.create({ data: user });
      return userInfo;
    }
  }
}
