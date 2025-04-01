// 导入必要的依赖
import { injectable, inject } from 'inversify'; // 依赖注入相关
import { PrismaDB } from '../db/index'; // 数据库访问层
import { UserDto } from './user.dto'; // 用户数据传输对象
import { plainToClass } from 'class-transformer'; // DTO转换工具
import { validate } from 'class-validator'; // DTO验证工具
import { JWT } from '../jwt';

@injectable() // 标记该类可被依赖注入容器管理
export class UserService {
  // 构造函数注入PrismaDB实例
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB, @inject(JWT) private readonly jwt: JWT) {}

  // 获取用户列表
  public async getList() {
    return await this.PrismaDB.prisma.user.findMany(); // 查询所有用户
  }

  // 创建用户
  public async createUser(data: UserDto) {
    // 将普通对象转换为UserDto类实例
    const user = plainToClass(UserDto, data);

    // 验证DTO数据
    const errors = await validate(user);
    const dto = [];

    if (errors.length) {
      // 如果有验证错误，收集所有错误信息
      errors.forEach((error) => {
        Object.keys(error.constraints).forEach((key) => {
          dto.push({
            [error.property]: error.constraints[key], // 错误字段和对应消息
          });
        });
      });
      return dto; // 返回错误信息集合
    } else {
      // 验证通过，创建用户
      const result = await this.PrismaDB.prisma.user.create({
        data: user,
      });
      return {
        ...result,
        token: this.jwt.createToken(result), //生成token
      };
    }
  }
}
