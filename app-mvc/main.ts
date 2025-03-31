import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { UserService } from './src/user/service';
import { User } from './src/user/controller';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaDB } from './src/db/index';
const container = new Container(); //Ioc搞个容器
/**
 * user模块
 */
container.bind(UserService).to(UserService); //添加到容器
container.bind(User).to(User); //添加到容器
/**
 * prisma依赖注入
 */
//注入工厂封装db
container.bind<PrismaClient>('PrismaClient').toFactory(() => {
  return () => {
    return new PrismaClient();
  };
});

container.bind(PrismaDB).to(PrismaDB); //添加到容器

const server = new InversifyExpressServer(container); //返回server
server.setConfig((app) => {
  app.use(express.json());
});

const app = server.build(); //返回app

app.listen(3000, () => {
  console.log('3000');
});
