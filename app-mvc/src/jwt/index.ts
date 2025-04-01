// 导入依赖注入装饰器
import { injectable } from 'inversify';
// 导入Passport认证库
import passport from 'passport';
// 导入JSON Web Token库
import jsonwebtoken from 'jsonwebtoken';
// 导入Passport的JWT策略和提取器
import { Strategy, ExtractJwt } from 'passport-jwt';

// 标记该类可被依赖注入容器管理
@injectable()
export class JWT {
  // JWT加密密钥(生产环境应从配置读取)
  private secret = 'aiolimp$%^&*()asdsd';

  // JWT验证配置选项
  private jwtOptions = {
    // 从Authorization头提取Bearer Token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // 使用相同的密钥验证
    secretOrKey: this.secret,
  };

  // 构造函数自动初始化JWT策略
  constructor() {
    this.strategy();
  }

  /**
   * 初始化JWT认证策略
   */
  public strategy() {
    // 创建新的JWT策略
    const strategy = new Strategy(this.jwtOptions, (payload, done) => {
      // 验证成功后直接返回payload
      done(null, payload);
    });
    // 将策略应用到Passport
    passport.use(strategy);
  }

  /**
   * 获取JWT认证中间件
   * @returns Passport JWT认证中间件
   */
  static middleware() {
    // 返回配置好的JWT认证中间件(禁用session)
    return passport.authenticate('jwt', { session: false });
  }

  /**
   * 生成JWT Token
   * @param data 要编码到Token中的数据
   * @returns 生成的JWT Token字符串
   */
  public createToken(data: object) {
    // 使用密钥签名数据，设置7天有效期
    return jsonwebtoken.sign(data, this.secret, { expiresIn: '7d' });
  }

  /**
   * 初始化Passport中间件
   * @returns Passport初始化中间件
   */
  public init() {
    return passport.initialize();
  }
}
