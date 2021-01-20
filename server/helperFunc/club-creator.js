const Club= require('../schemas/club')

let names = ["Ice Cream Club", "Engineers Without Borders", "Hiking Club", "Spikeball Club"]
let desc = ["We eat ice cream every day!", "Using engineering skills for the greater good", 
  "Hiking is cool", "Meet us at Yakitutu every friday to play spikeball!"]
let profileImg = "https://placeimg.com/640/480/any"
let bannerImage = "https://placeimg.com/960/480/any"
let leaders = ["6001ccb292e3e95ad07edc4f", "6001ccb292e3e95ad07edc4f", "6001ccb292e3e95ad07edc53", "6001ccb292e3e95ad07edc53"]
let school = "Cal Poly"
let tags = [["Food", "Recreational"], ["Academic", "Community Service"], ["Recreational", "Exercise", "Social"], ["Recreational", "Social"]]
for (let i = 0; i < names.length; i++) {
  let club = new Club()
  club.name = names[i]
  club.description = desc[i]
  club.profileImage = profileImg
  club.bannerImage = bannerImage
  club.leaders = [leaders[i]]
  club.school = school
  club.tags = tags[i]
  club.save()
}

