const students = [
    { name: "Parth", gender: "M", age: 33 },
    { name: "Parth2", gender: "F", age: 22 },
    { name: "Parth3", gender: "M", age: 26 },
    { name: "Parth4", gender: "F", age: 30 },
    { name: "Parth5", gender: "M", age: 37 },
];
  /*
  1. Filter all F students
  2. Filter students whose age is greater than 30
  3. Print the name whose age is 37
  */

  /*
const filteredGenderArray=[]
students.map((item)=>{
    if(item.gender==="F"){
        filteredGenderArray.push(item.name);
    }
})
console.log(`Female Students are  -> ${filteredGenderArray}`);

const filteredAgeArray=[];
students.map((item)=>{
    if(item.age > 30){
        filteredAgeArray.push(item.name);
    }
});
console.log(`Students with age > 30 are  -> ${filteredAgeArray}`);

students.map((item)=>{
    if(item.age == 37){
        console.log("Person with age 37 is -> ",item.name);
    }
});*/


const filteredGenderArray=[];
const filteredAgeArray=[];
students.map((item)=>{
    if(item.gender==="F"){
        filteredGenderArray.push(item.name);
    };
    if(item.age > 30){
        filteredAgeArray.push(item.name);
    };
    if(item.age == 37){
        console.log("Person with age 37 is -> ",item.name);
    }
});

console.log(`Female Students are  -> ${filteredGenderArray}`);
console.log(`Students with age > 30 are  -> ${filteredAgeArray}`);