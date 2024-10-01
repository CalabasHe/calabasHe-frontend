import AccountClaimForm from "../components/claimForm";
import Header from "../components/Header";

const AccountClaim = () => {
  return ( 
    <>
    <div className="relative min-w-screen lg:flex justify-between">
    <svg className="hidden lg:flex absolute -bottom-[260px] -left-[300px]" width="431" height="365" viewBox="0 0 431 365" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M376.632 26.342C419.132 56.735 436.032 126.424 428.632 188.54C421.232 250.657 389.431 305.098 346.931 334.979C304.431 364.861 251.231 369.977 206.931 360.87C162.531 351.66 127.231 328.123 94.5315 298.344C61.9315 268.463 31.9315 232.339 14.2315 178C-3.46851 123.763 -8.86852 51.4136 23.8315 21.0207C56.5315 -9.3723 127.231 2.29367 196.631 3.624C266.031 4.95433 334.132 -4.05096 376.632 26.342Z" fill="#04DA8D"/>
    </svg>
      <section className="hidden lg:flex items-center justify-center flex-col min-h-screen w-1/2">
        <div className="text-5xl leading-relaxed font-bold">
          <p>The new</p>
          <p>generation of</p>
          <p>reviews for</p>
          <p>practitioners</p>
        </div>
      </section>
      <section className="w-full lg:w-1/2 min-h-screen px-2 flex items-center justify-center">
        <AccountClaimForm/>
      </section>
    </div>
    </>
   );
}
 
export default AccountClaim;