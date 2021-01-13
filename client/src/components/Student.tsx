export default class Student {
  fn : string;
  ln: string;
  id: Number;
  school: string;
  email: string;
  interests: Array<string>;
  major?: string;
  collegeOf?: string;
  favoriteClubType?: string;
  joined_clubs: Array<string>;      // Stores ID's of clubs this student joined
  lead_clubs: Array<string>; // Stores ID's of clubs this student leads

  constructor(fn : string, ln: string, id: number, school: string, email: string, interests: Array<string>, clubs: Array<string>, lead_clubs: Array<string>, major?: string, collegeOf?: string, favoriteClubType?: string) {
    this.fn = fn;
    this.ln = ln;
    this.id = id;
    this.school = school;
    this.email = email;
    this.interests = interests;
    this.joined_clubs = clubs;
    this.lead_clubs = lead_clubs;

    if (major)
      this.major = major
    if (collegeOf)
      this.collegeOf = collegeOf
    if (favoriteClubType)
      this.favoriteClubType = favoriteClubType
  }

  // Method
  getId() {
    return this.id;
  }
}