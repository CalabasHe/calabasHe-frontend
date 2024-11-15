import axios from "axios"

const baseUrl = "https://calabashe-api.onrender.com/api/"
export const guestReviews = async (reviewDetails) => {
   const response = await axios.post(
    `${baseUrl}reviews/guest/`,
    reviewDetails)
    console.log(response)
}

export const verifyGuestIdentity = async (verificationDetails) => {
    const response = await axios.post( 
        `${baseUrl}reviews/verify/`, // weird behaviour when not using this one
        verificationDetails
    )
    return response
}