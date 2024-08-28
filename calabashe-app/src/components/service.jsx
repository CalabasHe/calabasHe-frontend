import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchServices } from "../api/getCategoriesData";
import Cookies from 'js-cookie';

const ServiceLink = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setIsLoading(true);
        // Check if services are already in the cookie
        const cachedServices = Cookies.get('services');
        if (cachedServices) {
          const parsedServices = JSON.parse(cachedServices);
          if (Array.isArray(parsedServices)) {
            setServices(parsedServices);
          } else {
            throw new Error('Cached data is not an array');
          }
        } else {
          // If not in cookie, fetch from API
          const fetchedServices = await fetchServices();
          console.log('Fetched services:', fetchedServices); // Log the fetched data
          if (Array.isArray(fetchedServices.results)) {
            setServices(fetchedServices.results);
            // Store in cookie (expires in 1 day)
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

  if (isLoading) return(
    <div className="h-[50vh] w-full flex items-center justify-center"><h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">Calabas<span className="text-[#04DA8D]">he</span></h1></div>
  ) 
    
  if (error) return <div  className="h-[50vh] md:h-[40vh] w-full flex items-center justify-center">Error: {error}</div>;

  return ( 
    <>
      <div className="w-full flex justify-center">
        {Array.isArray(services) && services.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id} className="font-medium text-xs md:text-sm truncate">
                <Link to={`/service/${service.slug}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No services available</p>
        )}
      </div>
    </>
  );
}
 
export default ServiceLink;