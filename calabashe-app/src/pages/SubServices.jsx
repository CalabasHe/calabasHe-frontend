import Header from "../components/Header";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchServiceCategories } from "../api/getCategoriesData";
import LoadingAnimation from "../components/loadingAnimation";
import getCategoryfromSlug from "../utils/getCategory";

const SubServices = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { subservices: paramSlug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    setCategory(getCategoryfromSlug(paramSlug))
  }, [paramSlug])

  useEffect(() => {
    location.state?.category && setCategory(location.state?.category)
    setSlug(location.state?.slug || paramSlug || "");
  }, [location, paramSlug]);

  useEffect(() => {
    const getServices = async () => {
      if (!slug) return;
      try {
        setIsLoading(true);
        const data = await fetchServiceCategories(`/categories/${slug}`);
        setServiceData(data.services);
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

  const splitServices = (services) => {
    const result = [];
    for (let i = 0; i < services.length; i += 5) {
      result.push(services.slice(i, i + 5));
    }
    return result;
  };

  const serviceGroups = splitServices(serviceData);

  const getGridClasses = () => {
    const baseClasses = "grid gap-8";
    if (serviceGroups.length === 1) {
      return `${baseClasses} justify-items-center`;
    }
    if (serviceGroups.length === 2) {
      return `${baseClasses} grid-cols-1 md:grid-cols-2`;
    }
    return `${baseClasses} grid-cols-1 md:grid-cols-2 lg:grid-cols-3`;
  };

  return (
    <>
      <Header />
      <main className="px-4 mt-16 md:mt-24 mb-3 md:px-12 lg:px-16">
        <button onClick={() => navigate(-1)} className="font-semibold hover:underline text-slate-500 hover:text-[#17a471]">&lt;&lt; Go back</button>
        <div className="mb-8 mt-16 md:mt-[10vh] md:mb-24 font-semibold text-sm md:text-lg lg:text-xl">
          {error ? (
            <p className="text-red-500 w-full text-center">{error}</p>
          ) : (
            <p className="">Showing all services under {category}</p>
          )}
        </div>
        <div className="w-full flex justify-center">
          {Array.isArray(serviceData) && serviceData.length > 0 ? (
            <div className={getGridClasses()}>
              {serviceGroups.map((group, index) => (
                <div key={index} className="p-4 pt-6 border bg-[#fff] rounded-md shadow-md min-w-[250px] w-full max-w-[350px]">
                  <ul className="">
                    {group.map((service) => (
                      <li key={service.id} className="font-medium text-xs md:text-sm mb-3 list-none truncate">
                        <Link className="hover:text-[#17a471] hover:underline" to={`/services/${slug}/${service.slug}`} state={{slug: service.slug, category: service.name}}>
                          <span className="text-[#17a471] mr-1">{service.total_providers} </span> {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && <p>No services available</p>
          )}
        </div>
      </main>
    </>
  );
};

export default SubServices;