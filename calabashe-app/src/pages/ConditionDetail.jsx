import { useParams } from "react-router-dom";
import AnimatePage from "../components/AnimatePage";
import { FadeInOut } from "../components/ComponentAnimations";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ConditionDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState({
    name: "",
    description: "Information about this condition is not available.",
    symptoms: [],
    treatments: []
  });
  const [doctors, setDoctors] = useState([]);
  
  // Add an effect to monitor doctors state changes
  useEffect(() => {
    console.log("Doctors state updated:", doctors);
  }, [doctors]);

  useEffect(() => {
    const fetchConditionDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.calabashe.com/api/conditions/${slug}/`);
        
        console.log("API Response:", response.data);
        
        // Check the structure of the response to see where doctors data might be located
        if (!response.data.doctors) {
          console.log("Warning: doctors field not found in API response");
          console.log("Response keys:", Object.keys(response.data));
          
          // Check if doctors might be nested under a different field
          for (const key in response.data) {
            if (typeof response.data[key] === 'object') {
              console.log(`Content of ${key}:`, response.data[key]);
            }
          }
        } else {
          console.log("Doctors in response:", response.data.doctors);
        }
        
        // The API returns data in a nested structure with results containing the condition details
        // Extract the condition data from results
        const conditionData = response.data.results || {};
        console.log("Condition data extracted:", conditionData);
        
        // Set the condition information
        setCondition({
          name: conditionData.name || "",
          // Since the API doesn't currently provide these fields,
          // we're using hardcoded data for now
          description: getDescriptionForCondition(conditionData.name || ""),
          symptoms: getSymptomsForCondition(conditionData.name || ""),
          treatments: getTreatmentsForCondition(conditionData.name || ""),
        });
        
        // Set the doctors who treat this condition
        if (conditionData.doctors && conditionData.doctors.length > 0) {
          console.log("Processing doctors:", conditionData.doctors);
          const processedDoctors = conditionData.doctors.map(doctor => {
            console.log("Processing doctor:", doctor);
            return {
              id: doctor.id,
              name: doctor.name,
              specialty: doctor.specialty,
              image: doctor.image, // No fallback - we'll handle this in the JSX
              rating: doctor.rating || 0
            };
          });
          console.log("Setting doctors state to:", processedDoctors);
          setDoctors(processedDoctors);
        } else {
          console.log("No doctors found in API response or doctors array is empty");
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching condition details:', err);
        setError('Failed to load condition details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchConditionDetails();
  }, [slug]);
  
  // Helper functions for demo purposes - these would ideally come from the API
  const getDescriptionForCondition = (name) => {
    const descriptions = {
      "Asthma": "Asthma is a chronic disease that affects your airways. Your airways are tubes that carry air in and out of your lungs. If you have asthma, the inside walls of your airways become sore and swollen.",
      "Diabetes": "Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat.",
      "Hypertension": "Hypertension, also known as high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems."
    };
    
    return descriptions[name] || "Information about this condition is currently being updated.";
  };
  
  const getSymptomsForCondition = (name) => {
    const symptoms = {
      "Asthma": [
        "Shortness of breath",
        "Chest tightness or pain",
        "Wheezing when exhaling",
        "Trouble sleeping caused by shortness of breath",
        "Coughing or wheezing attacks"
      ],
      "Diabetes": [
        "Increased thirst",
        "Frequent urination",
        "Extreme hunger",
        "Unexplained weight loss",
        "Fatigue",
        "Blurred vision"
      ],
      "Hypertension": [
        "Most people have no signs or symptoms",
        "Some people may experience headaches",
        "Shortness of breath or nosebleeds in severe cases"
      ]
    };
    
    return symptoms[name] || [];
  };
  
  const getTreatmentsForCondition = (name) => {
    const treatments = {
      "Asthma": [
        "Inhaled corticosteroids",
        "Leukotriene modifiers",
        "Long-acting beta agonists",
        "Combination inhalers"
      ],
      "Diabetes": [
        "Insulin therapy",
        "Oral medications",
        "Healthy eating",
        "Regular exercise"
      ],
      "Hypertension": [
        "Diuretics",
        "ACE inhibitors",
        "Angiotensin II receptor blockers",
        "Calcium channel blockers"
      ]
    };
    
    return treatments[name] || [];
  };

  return (
    <div className="2xl:container mx-auto 2xl:border-x">
      <Header />
      <div>
        <FadeInOut>
          <div className="z-0 absolute top-[60px] sm:top-[70px] w-[25%] bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
          <aside className="flex flex-col sm:flex-row items-center sm:items-start">
            <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl font-bold">
              {condition.name}
            </h1>
          </aside>
        </FadeInOut>

        <AnimatePage>
          <main className="w-full mt-16 md:mt-24 px-4 sm:px-8 md:px-12 pb-8">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading condition details...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Link to="/conditions" className="text-[#04DA8D] hover:underline flex items-center gap-1">
                    <span>←</span> Back to all conditions
                  </Link>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Condition details section */}
                  <div className="w-full md:w-2/3">
                    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                      <h2 className="text-xl font-bold mb-4 text-gray-800">About {condition.name}</h2>
                      <p className="text-gray-700 mb-6">{condition.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Common Symptoms</h3>
                      <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                        {condition.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Treatment Options</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {condition.treatments.map((treatment, index) => (
                          <li key={index}>{treatment}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h2 className="text-xl font-bold mb-4 text-gray-800">When to See a Doctor</h2>
                      <p className="text-gray-700">
                        If you experience persistent symptoms related to {condition.name}, it&apos;s important to consult with a healthcare professional. Early diagnosis and treatment can help manage symptoms and prevent complications.
                      </p>
                    </div>
                  </div>
                  
                  {/* Doctors section */}
                  <div className="w-full md:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                      <h2 className="text-xl font-bold mb-4 text-gray-800">Doctors Who Treat {condition.name}</h2>
                      {console.log("Rendering doctors array:", doctors)}
                      {doctors && doctors.length > 0 ? (
                        <div className="space-y-4">
                          {doctors.map((doctor) => {
                            try {
                              return (
                                <div key={doctor.id || Math.random()} className="flex items-center gap-3 p-3 border rounded-lg hover:border-[#04DA8D] transition-colors">
                                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    {doctor.image ? (
                                      <>
                                        <img 
                                          src={doctor.image} 
                                          alt={doctor.name || "Doctor"} 
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'block';
                                          }}
                                        />
                                        <svg
                                          className="w-8 h-8 fill-gray-700 hidden"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 448 512"
                                        >
                                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                        </svg>
                                      </>
                                    ) : (
                                      <svg
                                        className="w-8 h-8 fill-gray-700"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                      </svg>
                                    )}  
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-gray-800">{doctor.name || "Unknown Doctor"}</h3>
                                    <p className="text-sm text-gray-500">{doctor.specialty || "Medical Specialist"}</p>
                                    <div className="flex items-center mt-1">
                                      <span className="text-yellow-400">★</span>
                                      <span className="text-sm ml-1">{doctor.rating || "N/A"}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            } catch (err) {
                              console.error("Error rendering doctor:", err, doctor);
                              return <div key={Math.random()} className="p-3 border rounded-lg">Error displaying doctor</div>;
                            }
                          })}
                          {console.log("Finished rendering doctors list")}
                        </div>
                      ) : (
                        <p className="text-gray-600">No doctors found for this condition.</p>
                      )}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <a href="/doctors" className="block text-center w-full py-2 bg-[#04DA8D] hover:bg-[#03C47D] text-white rounded-md">
                          View All Specialists
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </AnimatePage>
      </div>
    </div>
  );
};

export default ConditionDetail;
