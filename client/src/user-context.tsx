import React from 'react'
import Student from './components/Student'

interface User {
    __v: number,
    _id: string,
    collegeOf: string,
    dp: string,
    email: string,
    gender: string,
    isVerified: boolean,
    joined_club: Array<string>,
    major: string,
    name: string,
    reviews_given: Array<any>,
    school: string
}

export const UserContext = React.createContext<undefined | Student>(undefined)