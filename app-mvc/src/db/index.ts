// 导入依赖注入相关装饰器
import { injectable, inject } from 'inversify';
// 导入Prisma客户端
import { PrismaClient } from '@prisma/client';

// 标记该类可被依赖注入容器管理
@injectable()
export class PrismaDB {
  // 声明Prisma客户端实例
  prisma: PrismaClient;

  // 构造函数，通过依赖注入获取PrismaClient工厂函数
  constructor(@inject('PrismaClient') PrismaClient: () => PrismaClient) {
    // 通过工厂函数创建Prisma客户端实例
    this.prisma = PrismaClient();
  }
}
