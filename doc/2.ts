import 'reflect-metadata';

function Type(type) {
  return Reflect.metadata('design:type', type);
}
function ParamTypes(...types) {
  return Reflect.metadata('design:paramtypes', types);
}
function ReturnType(type) {
  return Reflect.metadata('design:returntype', type);
}

function CustomType(type) {
  return Reflect.metadata('design:customtype', type);
}

@ParamTypes(String, Number)
class Guang {
  constructor(text, i) {}

  @Type(String)
  get name() {
    return 'text';
  }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  @CustomType('custom')
  add(x, y) {
    return x + y;
  }
}

const obj = new Guang('a', 1);

const addParamsType = Reflect.getMetadata('design:paramtypes', obj, 'add');
console.log('addParamsType: ', addParamsType);

const classParamsType = Reflect.getMetadata('design:paramtypes', Guang);
console.log('classParamsType: ', classParamsType);
const addType = Reflect.getMetadata('design:type', obj, 'add');
console.log('addType: ', addType);
const addCustomType = Reflect.getMetadata('design:customtype', obj, 'add');
console.log('addCustomType: ', addCustomType);
