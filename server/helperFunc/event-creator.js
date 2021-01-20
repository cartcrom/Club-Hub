let Event = require('../schemas/event')

let club = ["60088732d958ac35d881b6c9", "60088732d958ac35d881b6c9", "60088732d958ac35d881b6cb", "60088732d958ac35d881b6cb"]
let title = ["Competitive Ice Cream Eating Round 1", "Competitive Ice Cream Eating Round 2", "Hike to the P", "Hike to the top of Madonna Mountain"]
let description = ["Do you want to be the very best?", "Come to see who the best ice cream eater is", 
  "Join us for this fun and easy hike!", "Join us for this great hike with amazing views"]
let date = "Jan 20"
let image = ["https://placeimg.com/480/480/any", "https://placeimg.com/480/480/any", "https://placeimg.com/480/480/nature", "https://placeimg.com/480/480/nature"]
let eventDate = "Jan 21"
let eventTime = ["10PM - 11PM", "11PM-1AM", "8AM - 10AM", "4PM-6PM"]
let location = ["Dexter Lawn", "Dexter Lawn", "Sierra Madre Community Center", "PAC Circle"]

for (let i = 0; i < title.length; i++) {
  let event = new Event()
  event.club = club[i]
  event.name = title[i]
  event.desc = description[i]
  event.postDate = date
  event.eventDate = eventDate
  event.eventTime = eventTime[i]
  event.eventLoc = location[i]
  event.img = image[i]
  event.save()
}