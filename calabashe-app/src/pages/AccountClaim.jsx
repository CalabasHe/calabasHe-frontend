import { useState, useEffect } from 'react';
import AccountClaimForm from "../components/claimForm";
import Header from "../components/Header";
import { FadeInOut } from '../components/ComponentAnimations';

const AccountClaim = () => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [contentOverflow, setContentOverflow] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth < window.innerHeight);
    };

    const checkOverflow = () => {
      const content = document.getElementById('main-content');
      if (content) {
        setContentOverflow(content.scrollHeight > window.innerHeight);
      }
    };

    checkOrientation();
    checkOverflow();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const containerClass = `flex flex-col ${isLandscape && contentOverflow ? 'min-h-screen' : 'h-screen overflow-hidden'}`;

  return (
    <div className={`${containerClass} 2xl:container mx-auto`}>
      <div className="">
          <Header />
      </div>
      <FadeInOut>
      <div id="main-content" className="flex-grow relative xl:container xl:mx-auto max-xl:min-w-screen lg:flex justify-between overflow-hidden pt-[50px] lg:pt-[64px]">
        <svg className="hidden lg:block absolute 2xl:-bottom-[200px] -bottom-[260px] 2xl:left-0 -left-[100px] z-0" width="431" height="365" viewBox="0 0 431 365" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M376.632 26.342C419.132 56.735 436.032 126.424 428.632 188.54C421.232 250.657 389.431 305.098 346.931 334.979C304.431 364.861 251.231 369.977 206.931 360.87C162.531 351.66 127.231 328.123 94.5315 298.344C61.9315 268.463 31.9315 232.339 14.2315 178C-3.46851 123.763 -8.86852 51.4136 23.8315 21.0207C56.5315 -9.3723 127.231 2.29367 196.631 3.624C266.031 4.95433 334.132 -4.05096 376.632 26.342Z" fill="#04DA8D"/>
        </svg>
        <section className="hidden lg:flex items-center justify-center flex-col min-h-[calc(100vh-64px)] w-1/2 z-10">
          <div className="text-5xl leading-relaxed font-bold">
            <p>The new</p>
            <p>generation of</p>
            <p>reviews for</p>
            <p>practitioners</p>
          </div>
        </section>
        <section className="w-full lg:w-1/2 min-h-[calc(100vh-50px)] lg:min-h-[calc(100vh-64px)] pl-2 flex items-center justify-center z-10">
          <AccountClaimForm />
        </section>
      </div>
    </FadeInOut>
    </div>
  );
}

export default AccountClaim;