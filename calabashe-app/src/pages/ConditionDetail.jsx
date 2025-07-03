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
  
  useEffect(() => {
    const fetchConditionDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.calabashe.com/api/conditions/${slug}/`);
        
        // Set the condition information
        setCondition({
          name: response.data.name,
          // Since the API doesn't currently provide these fields,
          // we're using hardcoded data for now
          description: getDescriptionForCondition(response.data.name),
          symptoms: getSymptomsForCondition(response.data.name),
          treatments: getTreatmentsForCondition(response.data.name),
        });
        
        // Set the doctors who treat this condition
        if (response.data.doctors && response.data.doctors.length > 0) {
          setDoctors(response.data.doctors.map(doctor => ({
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
            image: doctor.image || "https://via.placeholder.com/60", // Fallback image if none provided
            rating: doctor.rating || 0
          })));
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
                      <div className="space-y-4">
                        {doctors.map((doctor) => (
                          <div key={doctor.id} className="flex items-center gap-3 p-3 border rounded-lg hover:border-[#04DA8D] transition-colors">
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                              <p className="text-sm text-gray-500">{doctor.specialty}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-yellow-400">★</span>
                                <span className="text-sm ml-1">{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 py-2 px-4 bg-[#04DA8D] text-white font-medium rounded hover:bg-[#03c47e] transition-colors">
                        View All Specialists
                      </button>
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
