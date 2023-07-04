import 'reflect-metadata';

const metaObj = {};

// 给一个对象定义元数据
Reflect.defineMetadata('name', 'name value', metaObj);
// console.dir(metaObj);
const value = Reflect.getMetadata('name', metaObj);
console.log('value: ', value);

// @Reflect.metadata('name', '100')

@Controller('test')
class Test {
  @Post('hello')
  hello() {
    return 1;
  }
}

// console.log(Reflect.getMetadata('name', Test));

function Controller(path: string) {
  // console.log('path: ', path);
  return function (target) {
    // console.log('target: ', target);
    // target.controllerPath = path;
    Reflect.defineMetadata('path', path, target);
  };
}

function Post(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('propertyKey: ', propertyKey);
    console.log('target: ', target);
  };
}
