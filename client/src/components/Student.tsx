export default class Student {
  fn : string;
  ln: string;
  id: Number;
  school: string;
  email: string;
  interests: Array<string>;

  constructor(fn : string, ln: string, id: number, school: string, email: string, interests: Array<string>) {
    this.fn = fn;
    this.ln = ln;
    this.id = id;
    this.school = school;
    this.email = email;
    this.interests = interests;
  }

  // Method
  getId() {
    return this.id;
  }
}