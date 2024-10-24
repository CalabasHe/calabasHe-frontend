import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { fetchServiceCategories } from "../api/getCategoriesData";
import LoadingAnimation from "../components/loadingAnimation";
import getCategoryfromSlug from "../utils/getCategory";
import StarRating from "../components/rating";

const ServiceProviders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { providers: paramSlug } = useParams();
  const { subservices: parentSlug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    setCategory(getCategoryfromSlug(paramSlug));
  }, [paramSlug]);

  useEffect(() => {
    location.state?.category && setCategory(location.state?.category);
    setSlug(location.state?.slug || paramSlug || "");
  }, [location, paramSlug]);

  useEffect(() => {
    const getServices = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await fetchServiceCategories(`/providers/${slug}`);
        // console.log(data);
        setDoctors(data.doctors);
        setFacilities(data.facilities);
        setError(null);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setIsLoading(false);
      }
    };
    getServices();
  }, [slug]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <div>
        <Header />
        <main className="px-4 mt-16 md:mt-24 pb-6 lg:pb-10 md:px-12 lg:px-16">
          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-sm md:text-base  font-semibold hover:underline text-slate-500 hover:text-[#17a471]"
            >
              &lt;&lt; Go back
            </button>

            <button
              onClick={() => navigate("/services")}
              className="text-sm md:text-base  font-semibold hover:underline text-slate-500 hover:text-[#17a471]"
            >
              To service categories &gt;&gt;
            </button>
          </div>

          <section className="mt-6 md:mt-10 space-y-4 md:space-y-8">
            <p
              className={`${
                facilities.length > 0 || doctors.length > 0 ? "" : "hidden"
              } text-sm md:text-base lg:text-lg font-medium`}
            >
              Facilities and Doctors providing{" "}
              <span className="font-semibold">
                {category}{" "}
                {category.toLowerCase().endsWith("services" || "service")
                  ? ""
                  : "Services "}
              </span>
            </p>
            <div className="w-full md:flex md:justify-center">
              {/* <div className="w-full md:flex md:justify-between"> */}
              {/* <div>
              <p className={`${doctors.length > 0 || facilities.length > 0  ? 'hidden md:flex' : 'hidden'} text-base text-slate-600 font-medium`}>
                  Filter Results
                </p>
              </div> */}
              <div
                className={`w-full ${
                  doctors.length > 0 || facilities.length > 0 ? "md:w-2/3" : ""
                } justify-self-end flex flex-col md:pl-4`}
              >
                {/* <div className={`w-full ${doctors.length > 0 || facilities.length > 0 ? '' : ''} justify-self-end flex flex-col md:pl-4`}> */}
                {doctors.length > 0 || facilities.length > 0 ? (
                  <section className="flex flex-col  gap-6 lg:gap-8">
                    {doctors.length > 0 && (
                      <>
                        <div className="order-2 space-y-3">
                          <p className="font-semibold text-base md:text-lg">
                            Doctors ({doctors.length})
                          </p>
                          {doctors.map((doctor) => (
                            <div
                              className="w-full hover:scale-[1.02] ease-in-out duration-300 cursor-pointer flex gap-2 md:gap-3 max-w-[450px] h-[120px] rounded-md border shadow-md px-2 py-2 bg-white"
                              key={doctor.id}
                            >
                              <div className="relative flex justify-center items-center min-w-[25%] h-full rounded-md bg-slate-500">
                                <svg
                                  className="w-12 sm:w-16 fill-white/60"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                </svg>
                                <svg
                                  className={` ${
                                    doctor.is_verified ? "flex" : "hidden"
                                  } absolute size-4 -top-1 -right-1 fill-current text-[#205CD4]`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  id="Layer_1"
                                  data-name="Layer 1"
                                  viewBox="0 0 24 24"
                                  width="512"
                                  height="512"
                                >
                                  <path d="M12,24c-1.617,0-3.136-.708-4.176-1.92-1.587,.124-3.166-.451-4.31-1.595-1.144-1.145-1.717-2.719-1.595-4.31-1.212-1.039-1.92-2.558-1.92-4.175s.708-3.136,1.92-4.175c-.122-1.591,.451-3.166,1.595-4.31,1.144-1.143,2.723-1.712,4.31-1.595,1.04-1.212,2.559-1.92,4.176-1.92s3.136,.708,4.176,1.92c1.587-.119,3.167,.452,4.31,1.595,1.144,1.145,1.717,2.719,1.595,4.31,1.212,1.039,1.92,2.558,1.92,4.175s-.708,3.136-1.92,4.175c.122,1.591-.451,3.166-1.595,4.31-1.143,1.144-2.722,1.719-4.31,1.595-1.04,1.212-2.559,1.92-4.176,1.92Zm-3.274-4.095l.37,.549c.653,.968,1.739,1.546,2.904,1.546s2.251-.578,2.904-1.546l.37-.549,.649,.126c1.148,.223,2.323-.136,3.147-.96,.824-.825,1.183-2.001,.96-3.146l-.127-.65,.55-.37c.968-.653,1.546-1.739,1.546-2.904s-.578-2.251-1.546-2.904l-.55-.37,.127-.65c.223-1.145-.136-2.322-.96-3.146-.824-.824-2-1.182-3.147-.96l-.649,.126-.37-.549c-.653-.968-1.739-1.546-2.904-1.546s-2.251,.578-2.904,1.546l-.37,.549-.649-.126c-1.147-.22-2.323,.136-3.147,.96-.824,.825-1.183,2.001-.96,3.146l.127,.65-.55,.37c-.968,.653-1.546,1.739-1.546,2.904s.578,2.251,1.546,2.904l.55,.37-.127,.65c-.223,1.145,.136,2.322,.96,3.146,.824,.823,1.998,1.182,3.147,.96l.649-.126Zm3.184-4.485l5.793-5.707-1.404-1.425-5.809,5.701-2.793-2.707-1.393,1.437,2.782,2.696c.391,.391,.903,.585,1.416,.585s1.021-.193,1.407-.58Z" />
                                </svg>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <Link
                                    to={`/doctors/${doctor.slug}`}
                                    className="font-bold text-base"
                                  >
                                    Dr.{" "}
                                    {doctor.first_name + " " + doctor.last_name}
                                  </Link>
                                  <p className="text-sm font-light">
                                    {doctor.specialty.name}
                                  </p>
                                  <div className="mt-1">
                                    <p className="text-sm">
                                      {doctor.reviews.length > 0
                                        ? doctor.reviews.length
                                        : "No"}{" "}
                                      {doctor.reviews.length === 1
                                        ? "review"
                                        : "reviews"}
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <StarRating
                                        rating={doctor.average_rating}
                                      />
                                      <p className="text-sm font-light">
                                        {doctor.average_rating.toFixed(1)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <section className="flex flex-col order-1 gap-4">
                      <p className="font-semibold text-base md:text-lg">
                        Facilities ({facilities.length})
                      </p>
                      <div className="space-y-3">
                        {facilities.map((facility) => (
                          <div
                            className="w-full hover:scale-[1.02] ease-in-out duration-300 cursor-pointer flex gap-2 md:gap-3 max-w-[450px] h-[120px] rounded-md border shadow-md px-2 py-2 bg-white"
                            key={facility.id}
                          >
                            <div className="relative flex justify-center items-center min-w-[25%] h-full rounded-md bg-slate-500">
                              <svg
                                className="w-12 sm:w-16 fill-white/60"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                              </svg>
                              <svg
                                className={` ${
                                  facility.verified ? "flex" : "hidden"
                                } absolute size-4 -top-1 -right-1 fill-current text-[#205CD4]`}
                                xmlns="http://www.w3.org/2000/svg"
                                id="Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 24 24"
                                width="512"
                                height="512"
                              >
                                <path d="M12,24c-1.617,0-3.136-.708-4.176-1.92-1.587,.124-3.166-.451-4.31-1.595-1.144-1.145-1.717-2.719-1.595-4.31-1.212-1.039-1.92-2.558-1.92-4.175s.708-3.136,1.92-4.175c-.122-1.591,.451-3.166,1.595-4.31,1.144-1.143,2.723-1.712,4.31-1.595,1.04-1.212,2.559-1.92,4.176-1.92s3.136,.708,4.176,1.92c1.587-.119,3.167,.452,4.31,1.595,1.144,1.145,1.717,2.719,1.595,4.31,1.212,1.039,1.92,2.558,1.92,4.175s-.708,3.136-1.92,4.175c.122,1.591-.451,3.166-1.595,4.31-1.143,1.144-2.722,1.719-4.31,1.595-1.04,1.212-2.559,1.92-4.176,1.92Zm-3.274-4.095l.37,.549c.653,.968,1.739,1.546,2.904,1.546s2.251-.578,2.904-1.546l.37-.549,.649,.126c1.148,.223,2.323-.136,3.147-.96,.824-.825,1.183-2.001,.96-3.146l-.127-.65,.55-.37c.968-.653,1.546-1.739,1.546-2.904s-.578-2.251-1.546-2.904l-.55-.37,.127-.65c.223-1.145-.136-2.322-.96-3.146-.824-.824-2-1.182-3.147-.96l-.649,.126-.37-.549c-.653-.968-1.739-1.546-2.904-1.546s-2.251,.578-2.904,1.546l-.37,.549-.649-.126c-1.147-.22-2.323,.136-3.147,.96-.824,.825-1.183,2.001-.96,3.146l.127,.65-.55,.37c-.968,.653-1.546,1.739-1.546,2.904s.578,2.251,1.546,2.904l.55,.37-.127,.65c-.223,1.145,.136,2.322,.96,3.146,.824,.823,1.998,1.182,3.147,.96l.649-.126Zm3.184-4.485l5.793-5.707-1.404-1.425-5.809,5.701-2.793-2.707-1.393,1.437,2.782,2.696c.391,.391,.903,.585,1.416,.585s1.021-.193,1.407-.58Z" />
                              </svg>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <Link
                                  to={`/facilities/${facility.facility_type_name.toLowerCase()}s/${
                                    facility.slug
                                  }`}
                                  className="font-bold text-base"
                                >
                                  {facility.name}
                                </Link>
                                <p className="text-sm font-light">
                                  {facility.facility_type.name}
                                </p>
                                <div className="mt-1">
                                  <p className="text-sm">
                                    {facility.reviews.length > 0
                                      ? facility.reviews.length
                                      : "No"}{" "}
                                    {facility.reviews.length === 1
                                      ? "review"
                                      : "reviews"}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <StarRating
                                      rating={facility.average_rating}
                                    />
                                    <p className="text-sm font-light">
                                      {facility.average_rating.toFixed(1)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </section>
                ) : (
                  <div className="h-[60vh] flex flex-col items-center justify-center gap-5 text-slate-500">
                    <p className="text-center md:text-lg">
                      No facilities or doctors provide{" "}
                      <span className="font-semibold mx-1">
                        {category}{" "}
                        {category
                          .toLowerCase()
                          .endsWith("services" || "service")
                          ? ""
                          : "Services "}
                      </span>{" "}
                      yet.
                    </p>
                    <Link
                      to={`/services/${parentSlug}`}
                      className="text-[#17a470] md:text-xl hover:underline"
                    >
                      {" "}
                      Explore Other Services
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ServiceProviders;
