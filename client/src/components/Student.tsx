export default class Student {
  name : String;
  id: Number;
  school: String;
  email: String;

  constructor(name : String, id: number, school: String, email: String) {
    this.name = name;
    this.id = id;
    this.school = school;
    this.email = email;
  }

  // Method
  getId() {
    return this.id;
  }
}