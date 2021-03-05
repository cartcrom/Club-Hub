import React from 'react';
import { findByTitle, fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import App from './App';
import { UserContext } from './UserContext';
import Student from './components/Student';
import UserSettings from './pages/UserProfile';
import { Route, StaticRouter, MemoryRouter } from 'react-router';
import FrontPage from './pages/front-pages/FrontPage';
import SignIn from './pages/front-pages/SignIn';
import SignUp from './pages/front-pages/SignUp';
import { ionFireEvent } from '@ionic/react-test-utils';
import MyClubs from './pages/MyClubs';
import InterestQuizIntro from './pages/interest-quiz/InterestQuizIntro';
import InterestQuiz from './pages/interest-quiz/InterestQuiz';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import AddEvent from './pages/AddEvent';
import { ClubContext } from './ClubContext';
import { DD_fake_clubs, DD_guest_user } from './DummyData';
import ClubProfile from './pages/ClubProfile';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

test('Settings correctly access UserContext', () => {
  const student = new Student("Vance", "Winstead", "123456789" , "Cal Poly SLO", "vance@calpoly.edu", ["Coding", "Music"], ["club club"], ["club club"], "SE", "Engineering", "some type")
  render(
    <UserContext.Provider value={student}>
      <StaticRouter location="/">
        <Route path="/" component={UserSettings}/>
      </StaticRouter>
    </UserContext.Provider>
  )
  expect(() => screen.getByText('Vance')).not.toThrow()
  expect(() => screen.getByText('ecnaV')).toThrow()
})

test('Checks My Clubs Page has correct title', () => {
  render(
    <UserContext.Provider value={DD_guest_user}>
        <ClubContext.Provider value={DD_fake_clubs}>
        <StaticRouter location='/'>
          <Route path='/' component={MyClubs}/>
        </StaticRouter>
      </ClubContext.Provider>
    </UserContext.Provider>
  )
  expect( () => screen.getByText('My Clubs')).not.toThrow()

})

test('I have an account button sends the user to the right page', () => {
  render(
    <MemoryRouter initialEntries={['/frontPage']}>
        <Route path="/frontPage" render={(props) => <FrontPage {...props} authenticate={() => {}}/>}/>
        <Route path="/signin" render={(props) => <SignIn {...props} authenticate={() => {}}/>}/>
    </MemoryRouter>
  )
  expect( () => screen.getByText('Log In')).toThrow()
  const button = screen.getByTitle('signInButton')
  ionFireEvent.click(button)
  expect( () => screen.getByText('Log In')).not.toThrow()
})

test('I\'m a new user button sends the user to the right page', () => {
  render(
    <MemoryRouter initialEntries={['/frontPage']}>
        <Route path="/frontPage" render={(props) => <FrontPage {...props} authenticate={() => {}}/>}/>
        <Route path="/signup" render={(props) => <SignIn {...props} authenticate={() => {}}/>}/>
    </MemoryRouter>
  )
  expect( () => screen.getByText('Log In')).toThrow()
  const button = screen.getByTitle('signUpButton')
  ionFireEvent.click(button)
  expect( () => screen.getByText('Log In')).not.toThrow()
})

test('Interest Quiz goes to feed', () => {
  render(
    <UserContext.Provider value={DD_guest_user}>
      <ClubContext.Provider value={DD_fake_clubs}>
        <MemoryRouter initialEntries={['/interestQuiz']}>
            <Route path="/interestQuiz" render={(props) => <InterestQuiz {...props} skipQuiz={() => {}} finishQuiz={() => {}} />}/>
            <Route path="/feed" component={Feed} exact={true} />
        </MemoryRouter>
      </ClubContext.Provider>
    </UserContext.Provider>
  )
  const button = screen.getByTitle('skipButton')
  ionFireEvent.click(button)
  expect( () => screen.getByText('ClubHub')).not.toThrow()
})

test('The AddEvent Button functions', () => {
  render(
    <UserContext.Provider value={DD_guest_user}>
      <ClubContext.Provider value={DD_fake_clubs}>
        <MemoryRouter initialEntries={['/club/id2']}>
            <Route path="/club/:id" component={ClubProfile} exact={true} />
            <Route path="/addEvent/:id" component={AddEvent} />
        </MemoryRouter>
      </ClubContext.Provider>
    </UserContext.Provider>
  )
  const button = screen.getByTitle('addButton');
  ionFireEvent.click(button)
  expect( () => screen.getByText('Event Adder')).not.toThrow()
})

test('Cannot submit an event if fields are blank', () => {
  render(
    <UserContext.Provider value={DD_guest_user}>
      <ClubContext.Provider value={DD_fake_clubs}>
        <MemoryRouter initialEntries={['/club/id2']}>
            <Route path="/club/:id" component={AddEvent} exact={true} />
            <Route path="/addEvent/:id" component={AddEvent} />
        </MemoryRouter>
      </ClubContext.Provider>
    </UserContext.Provider>
  )
  const button = screen.getByTitle('addEvent');
  ionFireEvent.click(button)
  expect( () => screen.getByText('Event Adder')).not.toThrow()
})


test('Signup renders', () => {
  const { baseElement } = render(
    <MemoryRouter initialEntries={['/frontPage']}>
        <Route path="/frontPage" render={(props) => <SignUp {...props} authenticate={() => {}}/>}/>
    </MemoryRouter>
  )
  expect(baseElement).toBeDefined();
})