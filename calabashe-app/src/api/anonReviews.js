import axios from "axios"

const baseUrl = "https://calabashe-api.onrender.com/api/"
export const guestReviews = async (reviewDetails) => {
   const response = await axios.post(
    `${baseUrl}reviews/guest/`,
    reviewDetails)
    return response
}

export const verifyGuestIdentity = async (verificationDetails) => {
    const response = await axios.post( 
        `${baseUrl}reviews/verify/`,
        verificationDetails
    )
    return response
}