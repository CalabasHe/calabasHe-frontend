import Stars from "./Star";
import '../stylesheets/reviews.css'
const serviceProvider = 'Miky Rola'
const placeholderText = "bruh"

function submitReview(){
  console.log('Hello! brev')
}


const Review = () => {
  return ( 
    <>
      <section className="antialiased font-helvetica w-fit flex flex-col gap-4 py-2 border-2 border-black text-center rounded-md ">
        
        <h3 className="border-b-2 border-black py-4 font-bold text-xl">Your review of {serviceProvider}</h3>
        
        <form className="flex flex-col gap-6 font-semibold justify-center px-6" >
          <p className="mb-2 max-w-[80%] text-center self-center">How likely are you to recommend this service?</p>
          <div className="flex justify-between">
            <Stars totalStars={5}/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="reviewText" >Tell us more about your visit</label>
            <textarea 
            className="bg-gray-200 p-2 caret-[#0B7F85] font-medium rounded-lg h-28 focus:outline-none " 
            id="reviewText" 
            name="reviewText" min="10"
            required 
            placeholder={placeholderText}>
            </textarea>
          </div>
          
          {/* Submit Button */}
          <button 
          className="submitButton w-full bg-[#0B7F85] text-white text-xl font-semibold py-4 rounded-lg flex gap-3 justify-center " 
          type="submit"
          onClick={submitReview}>
            Submit Review
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.978 11.108L4.06797 0.393987C2.39597 -0.508013 0.459966 1.05399 0.987966 2.87999L3.71597 12.428C3.82597 12.824 3.82597 13.22 3.71597 13.616L0.987966 23.164C0.459966 24.99 2.39597 26.552 4.06797 25.65L23.978 14.936C24.3176 14.7504 24.6011 14.4768 24.7985 14.1439C24.996 13.811 25.1002 13.4311 25.1002 13.044C25.1002 12.6569 24.996 12.277 24.7985 11.9441C24.6011 11.6112 24.3176 11.3376 23.978 11.152V11.108Z" fill="white"/>
            </svg>
          </button>
        </form> 
      </section>
    </>
   );
}
 
export default Review;