import Club from './components/Club';
import Student from './components/Student';

/* Sample Pics*/
import john from './images/john.jpg';
import ice from './images/rsz_ice_cream.jpg';


export let DD_fake_clubs = new Map<string, Club>();

//let test_event1 = new Event(selectClub("Cal Poly Ice Cream Club"), 1, "Come eat ice cream in an agressive fashion - points for speed and agression", "August 22", john, "Agressive Ice Cream Eating", "October 29", "12PM - 5PM", "Kennedy Lawn");
let test_club1 = new Club("Ice Cream Club", "id1", "A club for people who like Ice Cream", ice, john, [], "Cal Poly SLO", ["ice", "cream", "creamed", "iced"], undefined, [], [])
test_club1.addEvent("id1", "Come eat ice cream in an agressive fashion - points for speed and agression", new Date, john, "Agressive Ice Cream Eating", "Oct 29", "12PM - 5PM", "Kennedy Lawn")

let test_club2 = new Club("John Club", "id2", "A club for people who like John", john, john, [], "Cal Poly SLO", ["john", "religion"], undefined, [], [])
test_club2.addEvent("id2", "Come worship john, for he deserves our utmost devotion", new Date , ice, "John service", "Oct 31", "12PM - 5PM", "Church of John")

let test_club3 = new Club("John Club 2", "id3", "A club for people who like John even more", john, john, [], "Cal Poly SLO", ["john", "jon", "jonathan", "J"], undefined, [], [])
test_club3.addEvent("id3", "An even better john service, come to john club 2", new Date, ice, "John service2", "Oct 31", "11PM - 6PM", "Second Church of John");
test_club3.addEvent("id4", "We worship john TWICE a week...", new Date , ice, "John service2 pt 2", "Oct 32", "11PM - 6PM", "Second Church of John");

let test_club4 = new Club("Rockclimbing Club", "id4", "Climb all of the rocks", john, john, [], "Cal Poly SLO", ["rocks","climbing","outdoor","athletic", "recreation"], undefined, [], [])

DD_fake_clubs.set("id1", test_club1)
DD_fake_clubs.set("id2", test_club2)
DD_fake_clubs.set("id3", test_club3)
DD_fake_clubs.set("id4", test_club4)

export const DD_guest_user = new Student("Guest", "", "", "", "", [], [], [])