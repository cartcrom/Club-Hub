import { backend_URL } from '../constants';
import Club from '../components/Club'
import Student from '../components/Student';
import axios from 'axios';

export default class API {
    static login(loginInfo : {email: string, password: string}, callback: Function, error : Function)  {
        axios.post(backend_URL + '/login', loginInfo)
            .then((res : {data : any}) => {
                // handle success
                if (res.data) {
                    callback(this.convertUser(res.data))
                }
                else
                    error("Invalid Login")
                })
            .catch((err : any) => {
                // handle error
                if (!err.response) {
                    // network error
                    alert("Network Connection Error");
                } else {
                    console.log(err);
                    err(err.message);
                }
            })
            .then(function () {
            // always executed
        });
    }

    static signup(signupInfo : {firstName: string, lastName: string, college: string | undefined, email: string, password: string}, callback: Function, error : Function) {
        axios.post(backend_URL + '/SignUp', signupInfo)
            .then((res : {data : any}) => {
                // handle success
                callback(this.convertUser(res.data))
            })
            .catch((err : any) => {
                if (!err.response) {
                    // network error
                    alert("Network Connection Error");
                } else {
                    error(err.response.data);
                }
            })
    }

    static logout(callback: Function) {
        axios.get(backend_URL + '/logout')
            .then(() => callback())
            .catch((err : any) => {
                if (!err.response) {
                    // network error
                    alert("Network Connection Error");
                } else {
                    console.log(err.response.data);
                }
            })
    }

    static convertUser(s : any) : Student {
        let joined_clubs = s.joined_clubs
        if (joined_clubs.length && !(joined_clubs[0] instanceof String))
            joined_clubs = joined_clubs.map((c : any) => c._id)
            
        let lead_clubs = s.lead_clubs
        if (lead_clubs.length && !(lead_clubs[0] instanceof String))
            lead_clubs = lead_clubs.map((c : any) => c._id)
        return(new Student (
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
        ))
    }

    static verifyUser(studentId: string, callback: Function, error: Function) {
        console.log("test");
        let id_obj = {id: studentId}
        axios.post(backend_URL + '/verify/user', id_obj)
        .then(res => {
            if (res.data) {
                callback()
            }
            else {
                error("Invalid Verification Attempt")
            }
        })
        .catch(err => console.log(err))
    }

    static updateInterests(quizData : {school: string, collegeOf: string, major:string, interests: Array<string>, id: string}, callback: Function, error : Function) {
        console.log("... in api");
        axios.post(backend_URL + '/interest/quiz', quizData)
        .then((res : {data : boolean}) => {
            // handle success
            console.log(res);
            if (res.data) {
                callback()
            }
            else {
                error("Interest Quiz Submission Error")
            }
        })
        .catch((err : any) => {
            // handle error
            if (!err.response) {
                // network error
                alert("Network Connection Error");
            } else {
                console.log(err);
            }
          })
        .then(function () {
            // always executed
        });

    }

    static getAllClubs = (callback: Function) => {
        axios.get(backend_URL + '/get/clubs')
            .then((res: {data: Array<any>}) => {

                let clubs = new Map<string, Club>()
                

                res.data.forEach(c => {
                    console.log(c.name)
                    let club = new Club (
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
                    )

                    c.events.forEach((e : any) =>
                        club.addEvent(
                            e._id,
                            e.desc,
                            e.postDate,
                            e.img,
                            e.name,
                            e.eventDate,
                            e.eventTime,
                            e.eventLoc
                        )
                    )

                    clubs.set(club.id, club)
                })
                callback(clubs)
            })
            .catch((err : any) => {
                console.log(err)
            })
    }

    static getClubEvents = (id: string, callback: Function) => {
        console.log("meow")
        axios.get(backend_URL + '/get/clubEvents/' + id)
            .then((res: {data: Object}) => {
                console.log(res.data)
                callback(res.data)
            })
            .catch((err : any) => {
                console.log(err)
            })
    }

    static pushNewEvent(id : string, name : string, desc : string, postDate : string, eventDate : string, start : string, loc : string, image : string, callback: Function, error: Function) {
        const backendEventStructure = {
            id,
            name,
            desc,
            postDate,
            eventDate,
            start,
            loc,
            image,
          }
          
          axios.post(backend_URL + '/add/event', backendEventStructure)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }

    static createClub(newClub: {name: string, description: string, profileImage: string, bannerImage: string, tags: Array<string>, media: {[key: string]: string}, school: string, leaderId: string}, callback: Function, error : Function) {
        console.log("Adding new")
        axios.post(backend_URL + '/add/club', newClub)
        .then((res) => callback(res.data))
        .catch((err) => error(err))
    }

    static joinClub(studentId: string, clubId: string) {
        axios.post(backend_URL + '/joinClub', {studentId, clubId })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    static leaveClub(studentId: string, clubId: string) {
        axios.post(backend_URL + '/leaveClub', {studentId, clubId })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}