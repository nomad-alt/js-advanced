//part 1
function ShapePT(name, sides, sideLength) {
  this.name = name;
  this.sides = sides;
  this.sideLength = sideLength;
}

ShapePT.prototype.calcPerimeter = function () {
  return this.sides * this.sideLength;
};

var square = new ShapePT("square", 4, 5);
console.log(square.calcPerimeter()); // output: 20

var triangle = new ShapePT("triangle", 3, 3);
console.log(triangle.calcPerimeter()); // output: 9

//ES6 version of Shape class
class Shape {
  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }
  //paramnter = sides * lengthofsides
  calcPerimeter() {
    return this.sides * this.sideLength;
  }
}

//Bank class example
class BankAccount {
  constructor(owner) {
    this.owner = owner;
    this.balance = 0.0;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount} into ${this.owner}'s account.`);
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log(
        `Cannot withdraw ${amount} from ${this.owner}'s account. Insufficient funds.`
      );
    } else {
      this.balance -= amount;
      console.log(`Withdrew ${amount} from ${this.owner}'s account.`);
    }
  }

  getBalance() {
    console.log(`${this.owner}'s current balance is ${this.balance}.`);
  }
}

// Here i am testing this class
const account = new BankAccount("John");

account.deposit(1000);
account.getBalance(); // output: "John's current balance is 1000."

account.withdraw(500);
account.getBalance(); // output: "John's current balance is 500."

account.withdraw(1000); // output: "Cannot withdraw 1000 from John's account. Insufficient funds."
