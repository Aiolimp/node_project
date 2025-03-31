import { controller, httpGet as GetMapping, httpPost as PostMapping } from 'inversify-express-utils';
import { UserService } from './service';
import { inject } from 'inversify'; // 装饰器
import { Request, Response } from 'express'; // 类型
@controller('/user')
export class User {
  constructor(
    @inject(UserService) private readonly userService: UserService //依赖注入
  ) {}
  @GetMapping('/index') //get请求
  public async getIndex(req: Request, res: Response) {
    let result = await this.userService.getList(); //调用service方法
    res.send(result); //返回结果
  }

  @PostMapping('/create') //post请求
  public async createUser(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    res.send(user);
  }
}
