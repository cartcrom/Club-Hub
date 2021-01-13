export default class Student {
  fn : string;
  ln: string;
  id: Number;
  school: string;
  email: string;
  interests: Array<string>;
  clubs: Array<string>;      // Stores ID's of clubs this student joined
  lead_clubs: Array<string>; // Stores ID's of clubs this student leads

  constructor(fn : string, ln: string, id: number, school: string, email: string, interests: Array<string>, clubs: Array<string>, lead_clubs: Array<string>) {
    this.fn = fn;
    this.ln = ln;
    this.id = id;
    this.school = school;
    this.email = email;
    this.interests = interests;
    this.clubs = clubs;
    this.lead_clubs = lead_clubs;
  }

  // Method
  getId() {
    return this.id;
  }
}