const authenticate = require('./authentication');

const getUser = require("./getUser");
const axios = require('axios');
const { triggerAsyncId } = require('async_hooks');
const { login } = require('../verification/auth');

jest.mock('axios');

it('returns true for a account that has  verified the email.', async () => {
  axios.get.mockResolvedValue({
    data: {
      joined_club: [
        'Crunch Magazine',
        'Partners in Health Engage',
        'Candela Dance Troupe'
      ],
      reviews_given: [],
      isVerified: true,
      _id: "5fa409ead5f38957c0f3fd44",
      gender: 'male',
      name: 'Nina Cruz',
      major: 'History',
      collegeOf: 'College of Liberal Arts',
      school: 'Cal Poly',
      password: '1234',
      dp: 'https://unsplash.it/440/350?image=510',
      email: 'ninacruz@school.edu',
      __v: 0
    }
  });
  const resp = await authenticate("ninacruz@school.edu","1234")
  expect(resp).toEqual(true);
});

it('returns false for a account that has not verified the email.', async () => {
    axios.get.mockResolvedValue({
      data: {"_id":"5ffba22441fdc85bf0a91250","joined_club":[],"reviews_given":[],"isVerified":false,"name":"Jayant Devkar","email":"jayantdevkar6@gmail.com","password":"12345678","__v":{"$numberInt":"0"}}
    });
    const resp = await authenticate("jayantdevkar6@gmail.com","1234");
    expect(resp).toEqual(false);
  });
  

it('returns user as the account dose exists', async () => {
  axios.get.mockResolvedValue({
    data: {
      joined_club: [
        'Crunch Magazine',
        'Partners in Health Engage',
        'Candela Dance Troupe'
      ],
      reviews_given: [],
      isVerified: true,
      _id: "5fa409ead5f38957c0f3fd44",
      gender: 'male',
      name: 'Nina Cruz',
      major: 'History',
      collegeOf: 'College of Liberal Arts',
      school: 'Cal Poly',
      password: '1234',
      dp: 'https://unsplash.it/440/350?image=510',
      email: 'ninacruz@school.edu',
      __v: 0
    }
  });
  const resp = await getUser("ninacruz@school.edu","1234");
  expect(resp).toEqual("5fa409ead5f38957c0f3fd44");
});

it('returns null as the account dose not exists', async () => {
  axios.get.mockResolvedValue({
    data: {}
  });
  const resp = await getUser("wrongEmail.com","1234");
  expect(resp).toEqual(null);
});