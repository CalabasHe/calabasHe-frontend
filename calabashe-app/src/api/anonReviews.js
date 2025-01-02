import axios from "axios"

const baseUrl = "https://api.calabashe.com"
export const guestReviews = async (reviewDetails) => {
    try {
        const response = await axios.post(
            `${baseUrl}reviews/guest/`,
            reviewDetails
        );
        return response;
    } catch (err) {
        throw new Error(err.response?.data?.error.split('.')[0] || "Failed to submit guest review.");
    }
};


export const verifyGuestIdentity = async (verificationDetails) => {
    const response = await axios.post( 
        `${baseUrl}reviews/verify/`,
        verificationDetails
    )
    return response
}