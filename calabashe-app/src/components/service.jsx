import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServiceCategories } from "../api/getCategoriesData";
import Cookies from 'js-cookie';

const ServiceLink = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setIsLoading(true);
        const cachedServices = Cookies.get('services');
        if (cachedServices) {
          const parsedServices = JSON.parse(cachedServices);
          if (Array.isArray(parsedServices)) {
            setServices(parsedServices);
          } else {
            throw new Error('Cached data is not an array');
          }
        } else {
          const fetchedServices = await fetchServiceCategories();
          if (Array.isArray(fetchedServices.results)) {
            setServices(fetchedServices.results);
            Cookies.set('services', JSON.stringify(fetchedServices.results), { expires: 1 });
          } else {
            throw new Error('API did not return an array');
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  if (isLoading)
    return (
      <div className="h-[50vh] w-full flex items-center justify-center">
        <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    );

  if (error)
    return (
      <div className="h-[50vh] md:h-[40vh] w-full flex items-center justify-center">
        Error: {error}
      </div>
    );

  // Split services into three parts for three grid columns
  const splitServices = (services) => {
    const numColumns = 3;
    const perColumn = Math.ceil(services.length / numColumns);
    return Array.from({ length: numColumns }, (_, index) => 
      services.slice(index * perColumn, (index + 1) * perColumn)
    );
  };

  const servicesColumns = splitServices(services);

  return (
    <div className="w-full flex justify-center">
      {Array.isArray(services) && services.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesColumns.map((column, index) => (
            <div key={index} className="p-4 pt-6 border bg-[#fff] rounded-md shadow-md">
              <ul>
                {column.map((service) => (
                  <li key={service.id} className="font-medium text-xs md:text-sm mb-3 list-none truncate">
                    <Link to={``}><span className="text-[#17a471]">{service.service_count} </span> {service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No services available</p>
      )}
    </div>
  );
};

export default ServiceLink;
