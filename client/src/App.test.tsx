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
    <StaticRouter location='/'>
      <Route path='/' component={MyClubs}/>
    </StaticRouter>
  )
  expect( () => screen.getByText('My Clubs')).not.toThrow()

})

test('I have an account button sends the user to the right page', () => {
  render(
    <MemoryRouter initialEntries={['/frontPage']}>
        <Route path="/frontPage" render={(props) => <FrontPage {...props} setLogin={() => {}}/>}/>
        <Route path="/signin" render={(props) => <SignIn {...props} setLogin={() => {}} setUser={() => {}}/>}/>
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
        <Route path="/frontPage" render={(props) => <FrontPage {...props} setLogin={() => {}}/>}/>
        <Route path="/signup" render={(props) => <SignIn {...props} setLogin={() => {}} setUser={() => {}}/>}/>
    </MemoryRouter>
  )
  expect( () => screen.getByText('Log In')).toThrow()
  const button = screen.getByTitle('signUpButton')
  ionFireEvent.click(button)
  expect( () => screen.getByText('Log In')).not.toThrow()
})

test('Interest Quiz goes to feed', () => {
  render(
    <MemoryRouter initialEntries={['/interestQuiz']}>
        <Route path="/interestQuiz" render={(props) => <InterestQuiz {...props} skipQuiz={() => {}} finishQuiz={() => {}} />}/>
        <Route path="/feed" component={Feed} exact={true} />
    </MemoryRouter>
  )
  const button = screen.getByTitle('skipButton')
  ionFireEvent.click(button)
  expect( () => screen.getByText('ClubHub')).not.toThrow()
})

test('The AddEvent Button functions', () => {
  render(
    <MemoryRouter initialEntries={['/Explore']}>
         <Route path="/explore" component={Explore} exact={true} />
        <Route path="/addEvent" component={AddEvent} />
    </MemoryRouter>
  )
  const button = screen.getByTitle('addButton')
  ionFireEvent.click(button)
  expect( () => screen.getByText('Event Adder')).not.toThrow()
})

