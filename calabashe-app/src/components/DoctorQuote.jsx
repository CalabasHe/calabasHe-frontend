import Doctor from "../assets/images/Doctor-quote.png";
import DoctorWebP from "../assets/images/Doctor-quote.webp";

const DoctorQuote = () => {
  return (
    <>
      <section className="relative w-full md:max-h-[300px] p-8 md:px-[8%] md:pt-4 md:pb-0 pb-0 flex flex-col md:flex-row gap-3 justify-center md:justify-between md:items-start bg-[#02291B]">
        <div className="relative max-w-[950px] md:flex ">
          <blockquote className="flex flex-col items-center gap-2 md:max-w-[60%] md:pb-6 lg:pl-[100px]">
            <svg
              className="fill-[#04D98B] w-[70px] md:self-start"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z" />
            </svg>
            <p className="text-lg text-center md:text-left text-white font-normal px-4 md:pl-4">
              <em>
              By sharing your experience of my care as your doctor, 
              you help other patients make informed decisions about me and the clinic or hospital where I treated you.
              </em>
            </p>
          </blockquote>

          <picture className="z-0 md:w-[40%] max-w-[600px] lg:w-[30%] md:absolute  bottom-0  md:right-0">
            <source
              className=""
              srcSet={DoctorWebP}
              type="image/webp"
              alt="Doctor wearing a stethoscope"
            ></source>
            <img
              className=""
              src={Doctor}
              alt="Doctor wearing a stethoscope"
              loading="lazy"
            ></img>
          </picture>
        </div>
      </section>
    </>
  );
};
export default DoctorQuote;
