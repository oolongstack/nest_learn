import 'reflect-metadata';

function Module(metadata) {
  // const propsKeys = Object.keys(metadata);
  return (target) => {
    for (const property in metadata) {
      if (Object.prototype.hasOwnProperty.call(metadata, property)) {
        Reflect.defineMetadata(property, metadata[property], target);
      }
    }
  };
}

@Module({
  imports: [1, 2],
  providers: [3, 4],
})
class AppModule {}

export {};
