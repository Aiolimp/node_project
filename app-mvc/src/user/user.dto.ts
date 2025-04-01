// 导入必要的装饰器
import { IsNotEmpty, IsEmail } from 'class-validator'; // 验证装饰器
import { Transform } from 'class-transformer'; // 数据转换装饰器

// 用户数据传输对象(DTO)类
export class UserDto {
  // 用户名属性
  @IsNotEmpty({ message: '用户名必填' }) // 验证不能为空
  @Transform((user) => user.value.trim()) // 自动去除前后空格
  name: string;

  // 邮箱属性
  @IsNotEmpty({ message: '邮箱必填' }) // 验证不能为空
  @IsEmail({}, { message: '邮箱格式不正确' }) // 验证邮箱格式
  @Transform((user) => user.value.trim()) // 自动去除前后空格
  email: string;
}
