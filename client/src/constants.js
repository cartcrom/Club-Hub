// Constants.js
const prod = "https://clubhub309.herokuapp.com"

const dev = "http://localhost:5000"

export const backend_URL = process.env.NODE_ENV === "development" ? dev : prod;