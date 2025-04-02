// 导入必要的装饰器和类型
import { controller, httpGet as GetMapping, httpPost as PostMapping } from 'inversify-express-utils'; // 路由控制器装饰器
import { UserService } from './service'; // 用户服务层
import { inject } from 'inversify'; // 依赖注入装饰器
import { Request, Response } from 'express'; // Express请求响应类型
import { JWT } from '../jwt'; // jwt模块
@controller('/user')
export class User {
  // 构造函数注入UserService实例
  constructor(
    @inject(UserService) private readonly userService: UserService // 依赖注入用户服务
  ) {}

  // 处理GET /user/index请求
  @GetMapping('/index', JWT.middleware())
  public async getIndex(req: Request, res: Response) {
    console.log(req);
    // 调用服务层获取用户列表
    let result = await this.userService.getList();
    // 返回查询结果
    res.send(result);
  }
  // 处理POST /user/create请求
  @PostMapping('/create')
  public async createUser(req: Request, res: Response) {
    // 调用服务层创建用户
    const user = await this.userService.createUser(req.body);
    // 返回创建结果
    res.send(user);
  }
}
