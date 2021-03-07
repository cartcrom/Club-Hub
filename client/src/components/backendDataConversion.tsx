import Club from "./Club";
import Student from "./Student";

/* Supports populated and depopulated students */
export function backendToStudent(s: any): Student {
  let joined_clubs = s.joined_clubs;
  if (joined_clubs.length && !(joined_clubs[0] instanceof String)) {
    joined_clubs = joined_clubs.map((c: any) => c._id);
  }
  let lead_clubs = s.lead_clubs;
  if (lead_clubs.length && !(lead_clubs[0] instanceof String)) {
    lead_clubs = lead_clubs.map((c: any) => c._id);
  }

  return new Student(
    s.firstName,
    s.lastName,
    s._id,
    s.school,
    s.email,
    s.interests,
    joined_clubs,
    lead_clubs,
    s.major,
    s.collegeOf,
    undefined
  );
}

/* Supports Clubs with populated meetings and events */
export function backendToClub(c: any): Club {
  const club = new Club(
    c.name,
    c._id,
    c.description,
    c.profileImage,
    c.bannerImage,
    c.leaders,
    c.school,
    c.tags,
    undefined,  // Currently does not support meetings
    c.mediaPlugs,
    [],
  );
  // console.log(club)
  if (c.events) {
    for (const event of c.events) {
      backendAddEvent(event, club);
    }
  }
  return club;
}

/* Supports Populated and Depopulated Events */
export function backendAddEvent(e: any, club: Club) {
  club.addEvent(
    e._id,
    e.desc,
    e.postDate,
    e.img,
    e.name,
    e.eventDate,
    e.eventTime,
    e.eventLoc
  );
}