import Student from './Student';
import Event from './Event';

export default class Club {
  name : string;
  id: string;
  description: string;
  profileImage: string;
  bannerImage: string;
  clubLeaders: Array<Student>
  school: string;
  tags: Array<string>;
  meetings?: Array<Event>;
  socialMedia: Array<string>
  events: Array<Event>

  constructor(name : string, id: string, description: string, profileImage: string, bannerImage: string, clubLeaders: Array<Student>,
    school: string, tags: Array<string>, meetings: Array<Event> | undefined, socialMedia: Array<string>, events: Array<Event>) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.profileImage = profileImage;
    this.bannerImage = bannerImage;
    this.clubLeaders = clubLeaders;
    this.school = school;
    this.tags = tags;
    this.meetings = meetings;
    this.socialMedia = socialMedia;
    this.events = events;
  }

  // Method
  getId() {
    return this.id;
  }

  addEvent(id: string, description: string, date: string, image: string,
    title: string, eventDate: string, eventTime: string, location: string) {
    let e = new Event(this, id, description, date, image, title, eventDate, eventTime, location);
    this.events.push(e);
  }
}