function createArray<T>(items: T[]): T[] {
  console.log(T);
  return new Array<T>().concat(items);
}

createArray<number>([1,2,3])