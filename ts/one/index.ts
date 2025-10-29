let myName: string = "Nithin";
let age: number = 23;
let isStudying: boolean = true;

let data: null = null;
let year: undefined = undefined;

let a: any = "Hello";
a = 23;
a = true;
a = 1234.566;

// let b: unknown = "hello";

// if (typeof b === "string") {
//   console.log(b);
// }

// if (typeof b === "number") {
//   console.log(b);
// }

function greet(): void {
  console.log(`Hello ${myName}`);
}
greet();

let message: string = "Internal Error";

// function throwError(message: string): never {
//   throw new Error(message);
// }

// throwError(message);

let largeNumber: bigint = 1000000000000000n;

let id1: symbol = Symbol("user");
let id2: symbol = Symbol("user");
console.log(id1 === id2);

function sum(a: number, b: number): number {
  return a + b;
}

let city = "kent";

let names: readonly string[] = ["Nithin", "shiva", "Chintu", "Abhi", "Alex"];
// names.push("hello");

let years: Array<number> = [1, 2, 3, 4, 5, 6];

let data1: readonly (string | number)[] = ["Nithin", 23, 10, "hell0"];

let tupleExample: [string, number, boolean] = ["Hello", 2025, true];

function getUserInfo(): [string, number] {
  return ["Alice", 25];
}

let info = getUserInfo();
console.log(info[0]);
console.log(info[1]);

let personDeatils: [string, number?, string?] = ["Nithin"];

personDeatils = ["Nithin", 24, "computer Science"];

personDeatils = ["Shiva", 27];

const readOnlyTyple: readonly [string, number] = ["Nithin", 24];

type User = [id: number, name: string, age: number];

let tupleOne: User = [1, "Nithin", 24];

type UserData = {
  readonly id: number;
  name: string;
  age?: number;
  isAdmin: boolean;
  department: { readonly id: number; name: string };
};

let userOne: UserData = {
  id: 1,
  name: "Nithin",
  age: 23,
  isAdmin: true,
  department: { id: 1, name: "ComputerScience" },
};

let UserTwo: UserData = {
  id: 2,
  name: "Shiva",
  age: 24,
  isAdmin: false,
  department: { id: 2, name: "CivilEngineering" },
};

// console.log(user.department["name"]);
// console.log(user.department.name);

enum Direction {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
}

console.log(Direction.North);

enum TaskStatus {
  NotStarted = "NOTSTARTED",
  Started = "STARTED",
  Completed = "COMPLETED",
}

function updateTask(status: TaskStatus) {
  if (status === TaskStatus.NotStarted) {
    console.log("Task Not Started Yet");
  } else if (status === TaskStatus.Started) {
    console.log("Work in Progress");
  } else {
    console.log("Task Completed");
  }
}

updateTask(TaskStatus.Completed);

function multiply(a: number, b: number): number {
  return a * b;
}

const multiplyTwo = function (a: number, b: number): number {
  return a * b;
};

const mutliplyThree = (a: number, b: number): number => a * b;

console.log(multiply(2, 2));

function sayHello(): string {
  return "Hello";
}

console.log(sayHello());

function greetUser(name: string, age?: number, role: string = "Guest"): string {
  return `Hello ${name}`;
}

console.log(greetUser("Nithin", 23));
console.log(greetUser("Shiva"));

type MutliplyType = (a: number, b: number) => number;

const multiplyFour: MutliplyType = (a, b) => a * b;

function sumNum(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0);
}

type Value = string | number;

let value: Value;
value = "Hello";
value = 23;
// value = true;

function typeNarrow(val: string | number) {
  if (typeof val === "string") {
    console.log(val);
  } else {
    console.log(val.toFixed(2));
  }
}

typeNarrow("Nithin");

typeNarrow(12.3344455);

type OurUser = { name: string; email: string };
type Admin = { name: string; email: string; accessedRoutes: string[] };

function rolesAuth(Person: OurUser | Admin) {
  if ("accessedRoutes" in Person) {
    console.log(`hey Admin : ${Person.accessedRoutes}`);
  } else {
    console.log("hey user");
  }
}

rolesAuth({
  name: "Nithin",
  email: "demo@gmail.com",
  accessedRoutes: ["everything"],
});

interface Data {
  readonly name: string;
  age: number;
  year?: number;
}

const personData: Data = {
  name: "Nithin",
  age: 23,
  // year: 2002,
};

// personData.name = "Shiva";

interface Person {
  name: string;
}

interface Employee extends Person {
  department: string;
}

const employeeData: Employee = {
  name: "Shiva",
  department: "Civil Engineering",
};

function identity<T>(value: T): T {
  return value;
}

console.log(identity("Hello"));
console.log(identity(5));
// Auto detection

console.log(identity<boolean>(true));
console.log(identity<string>("Hello Nithin"));

function getElement<T>(arr: T[]): T {
  return arr[0];
}

console.log(getElement<string>(["hello", "Nithin"]));
console.log(getElement<number>([1, 2, 3, 4]));

function getObject<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log(getObject<string, number>("year", 2025));

interface ApiResponse<T> {
  status: number;
  data: T;
}

const userResposne: ApiResponse<{ name: string }> = {
  status: 200,
  data: {
    name: "Nithin",
  },
};
