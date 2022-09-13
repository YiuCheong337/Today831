class Student {
    /* Fields or called properties */
    name: string;
    age: number;
    learningLevel: number;

    /* construction of this class's instance */
    constructor (name: string, age: number){
        this.name = name;
        this.age = age;
        this.learningLevel = 0;
    }

    /* method = function */
    learn(hourSpent:number){
        this.learningLevel += hourSpent * 0.3;
        this.slack(hourSpent / 6);
    }

    slack(hourSpent:number){
        this.learningLevel -= hourSpent * 0.1;
        // this.learn(hourSpent / 7); <<<< THIS IS VERY DANGEROUS as it will enter infinite loop 
                                    // as above learning goes to slack, then slack goes to learning,
                                    // this will cause "ERROR: MAX CALL STACK SIZE EXCEEDED"
    }

}

const bob: Student = new Student("Bob", 20);
const alice: Student = new Student("Alice", 10);
// console.log(bob);
// console.log(alice);

// const ben: Student = new Student("Ben", 30);

bob.learn(3);
alice.slack(2);
bob.slack(5);
alice.learn(3);

console.log(bob.learningLevel);
console.log(alice.learningLevel);

/* inheritance ..... */
/* subclass (child) and superclass (parents) relationship */
class CodingStudent extends Student{

}

const charlie = new CodingStudent("Charlie", 20);

charlie.learn(20);
charlie.slack(10);
console.log(charlie);