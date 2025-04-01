// 导入必要的依赖
import 'reflect-metadata'; // 反射元数据支持
import { InversifyExpressServer } from 'inversify-express-utils'; // Inversify Express 服务器
import { Container } from 'inversify'; // 依赖注入容器
import { UserService } from './src/user/service'; // 用户服务
import { User } from './src/user/controller'; // 用户控制器
import express from 'express'; // Express 框架
import { PrismaClient } from '@prisma/client'; // Prisma 客户端
import { PrismaDB } from './src/db/index'; // Prisma 数据库封装
import { JWT } from './src/jwt';

// 创建依赖注入容器
const container = new Container(); // 初始化IoC容器

/**
 * 用户模块依赖注入配置
 */
container.bind(UserService).to(UserService); // 注册用户服务到容器
container.bind(User).to(User); // 注册用户控制器到容器

/**
 * Prisma 数据库模块依赖注入配置
 */
// 使用工厂模式注入PrismaClient
container.bind<PrismaClient>('PrismaClient').toFactory(() => {
  return () => {
    return new PrismaClient(); // 每次请求返回新的PrismaClient实例
  };
});

container.bind(PrismaDB).to(PrismaDB); // 注册Prisma数据库封装到容器

/**
 * jwt模块
 */
container.bind(JWT).to(JWT); //主要代码

// 创建Inversify Express服务器
const server = new InversifyExpressServer(container); // 使用容器创建服务器实例

// 配置Express中间件
server.setConfig((app) => {
  app.use(express.json()); // 添加JSON请求体解析中间件
  app.use(container.get(JWT).init()); // 添加JWT初始化中间件
});

// 构建Express应用
const app = server.build(); // 构建Express应用实例

// 启动服务器
app.listen(3000, () => {
  console.log('服务器已启动，监听端口3000'); // 服务器启动日志
});
