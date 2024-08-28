const FaqSection = () => {
  return (
    <>
      <section className="w-full flex flex-col items-center p-3 py-8 md:py-16 space-y-6 md:space-y-10">
        <h2 className="w-full text-center font-semibold text-lg sm:text-xl md:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="max-w-[450px] md:max-w-[80%] lg:max-w-[1100px] space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <article className="duration-300 cursor-pointer transform-gpu antialiased flex flex-col md:hover:scale-105 md:hover:ring ring-green-100 items-center gap-2 p-4 bg-white py-6 rounded-lg shadow-md">
            <div className="duration-300">
              <h3 className="text-sm md:text-base text-center font-medium">
                How can I rate a doctor?
              </h3>
              <p className="text-xs md:text-sm text-center">{`After visiting a doctor, log into your account, find the doctor's page and click on 'Rate This Doctor' to start your review.`}</p>
            </div>
          </article>
          <article className="duration-200 cursor-pointer transform-gpu antialiased flex flex-col md:hover:scale-105 md:hover:ring ring-green-100 items-center gap-2 p-4 bg-white py-6 rounded-lg shadow-md">
            <div className="duration-300">
              <h3 className="text-sm md:text-base text-center font-medium">
                How many reviews can I make a day?
              </h3>
              <p className="text-xs md:text-sm text-center">{`All users are limited to 5 ratings a day. This is to ensure authenticity and genuine ratings that can help people make crucial health decisions.`}</p>
            </div>
          </article>

          <article className="duration-200 cursor-pointer transform-gpu antialiased flex flex-col md:hover:scale-105 md:hover:ring ring-green-100 items-center gap-2 p-4 bg-white py-6 rounded-lg shadow-md">
            <div className="duration-300">
              <h3 className="text-sm md:text-base text-center font-medium">
                Is this service really free?
              </h3>
              <p className="text-xs md:text-sm text-center">{`Yes, it is! Feel free to review health professionals, services, as well as health facilities based on your experiences.`}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
