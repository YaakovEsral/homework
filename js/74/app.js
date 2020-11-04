(function () {
    'use strict';

    class Student {
        constructor(first, last, age, grade) {
            this.first = first;
            this.last = last;
            this.age = age;
            this.grade = grade;
        }
    }

    const students = [
        new Student('Yechiel', 'Diskind', 16, 11),
        new Student('Tzvi', 'Isenberg', 17, 12),
        new Student('Moshe', 'Katz', 15, 10)
    ];

    function printStudents(regularOrder, ...students) {
        // console.log(typeof students, students);
        // for (let i = 0; i < students.length; i++) {
        //     console.log(students[i]);
        // }

        for (let i = 0; i < students.length; i++) {
            const {first, last, ...rest} = students[i];
            if(!regularOrder){
                console.log(last, first, rest.grade, rest.age);
            }
            else {
                console.log(first, last, rest.grade, rest.age);
            }            
        }
    }

    printStudents(true, ...students);
    printStudents(false, new Student('Yechiel', 'Diskind', 16, 11),
        new Student('Tzvi', 'Isenberg', 17, 12));

    // const ob = {
    //     name: 'Jake Buddy',
    //     age: 24,
    //     email: 'jakebuddy18@gmail.com'
    // };

    // const {name: myName, age: myAge} = ob;
    // console.log(myName, myAge);

    // const ar = [3, 4 ,5, 6];
    // const [a, b, , d] = ar;
    // console.log(a, b, d);

    function swapInfo(student){
        let swappedStudent;
        let {first, last, ...rest} = student;
        console.log(rest);
        // swappedStudent = new Student(student.last, student.first, student.age, student.age);
        swappedStudent = new Student(last, first, rest.age, rest.grade);
        return swappedStudent;
    }

    console.log('swapping a student', swapInfo(students[0]));
}());