import { useParams } from "react-router-dom";
import AnimatePage from "../components/AnimatePage";
import { FadeInOut } from "../components/ComponentAnimations";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const ConditionDetail = () => {
  const { slug } = useParams();
  
  // Hardcoded condition details (in a real app, this would come from an API)
  const conditionDetails = {
    "asthma": {
      name: "Asthma",
      description: "Asthma is a chronic disease that affects your airways. Your airways are tubes that carry air in and out of your lungs. If you have asthma, the inside walls of your airways become sore and swollen.",
      symptoms: [
        "Shortness of breath",
        "Chest tightness or pain",
        "Wheezing when exhaling, which is a common sign of asthma in children",
        "Trouble sleeping caused by shortness of breath, coughing or wheezing",
        "Coughing or wheezing attacks that are worsened by a respiratory virus"
      ],
      treatments: [
        "Inhaled corticosteroids",
        "Leukotriene modifiers",
        "Long-acting beta agonists",
        "Combination inhalers",
        "Theophylline"
      ]
    },
    "diabetes": {
      name: "Diabetes",
      description: "Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy.",
      symptoms: [
        "Increased thirst",
        "Frequent urination",
        "Extreme hunger",
        "Unexplained weight loss",
        "Fatigue",
        "Irritability",
        "Blurred vision"
      ],
      treatments: [
        "Insulin therapy",
        "Oral diabetes medications",
        "Healthy eating",
        "Regular exercise",
        "Blood sugar monitoring"
      ]
    },
    "hypertension": {
      name: "Hypertension",
      description: "Hypertension, also known as high blood pressure, is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems, such as heart disease.",
      symptoms: [
        "Most people with high blood pressure have no signs or symptoms, even if blood pressure readings reach dangerously high levels",
        "Some people may experience headaches, shortness of breath or nosebleeds",
        "These signs and symptoms aren't specific and usually don't occur until high blood pressure has reached a severe or life-threatening stage"
      ],
      treatments: [
        "Diuretics",
        "ACE inhibitors",
        "Angiotensin II receptor blockers",
        "Calcium channel blockers",
        "Beta blockers",
        "Lifestyle changes"
      ]
    }
  };
  
  // Mock doctors data (in a real app, this would come from an API)
  const mockDoctors = {
    "asthma": [
      { id: 1, name: "Dr. Sarah Johnson", specialty: "Pulmonologist", image: "https://via.placeholder.com/60", rating: 4.8 },
      { id: 2, name: "Dr. Michael Chen", specialty: "Allergist", image: "https://via.placeholder.com/60", rating: 4.9 },
      { id: 3, name: "Dr. Emily Parker", specialty: "Pulmonologist", image: "https://via.placeholder.com/60", rating: 4.7 },
      { id: 4, name: "Dr. David Wilson", specialty: "Internal Medicine", image: "https://via.placeholder.com/60", rating: 4.5 }
    ],
    "diabetes": [
      { id: 5, name: "Dr. James Miller", specialty: "Endocrinologist", image: "https://via.placeholder.com/60", rating: 4.9 },
      { id: 6, name: "Dr. Lisa Wang", specialty: "Endocrinologist", image: "https://via.placeholder.com/60", rating: 4.8 },
      { id: 7, name: "Dr. Robert Thompson", specialty: "Internal Medicine", image: "https://via.placeholder.com/60", rating: 4.6 },
      { id: 8, name: "Dr. Susan Garcia", specialty: "Dietitian", image: "https://via.placeholder.com/60", rating: 4.7 }
    ],
    "hypertension": [
      { id: 9, name: "Dr. John Williams", specialty: "Cardiologist", image: "https://via.placeholder.com/60", rating: 4.9 },
      { id: 10, name: "Dr. Maria Rodriguez", specialty: "Cardiologist", image: "https://via.placeholder.com/60", rating: 4.8 },
      { id: 11, name: "Dr. Kevin Taylor", specialty: "Nephrologist", image: "https://via.placeholder.com/60", rating: 4.7 },
      { id: 12, name: "Dr. Patricia Lee", specialty: "Internal Medicine", image: "https://via.placeholder.com/60", rating: 4.6 }
    ]
  };

  // Default content for conditions not in our hardcoded data
  const defaultCondition = {
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
    description: "This is a medical condition that affects many people worldwide. Consult with a healthcare professional for more information.",
    symptoms: [
      "Symptoms vary by individual",
      "Consult with a healthcare professional for an accurate diagnosis"
    ],
    treatments: [
      "Treatment options depend on individual circumstances",
      "Consult with a healthcare professional for appropriate treatment"
    ]
  };

  const defaultDoctors = [
    { id: 101, name: "Dr. Jane Smith", specialty: "General Practice", image: "https://via.placeholder.com/60", rating: 4.5 },
    { id: 102, name: "Dr. Mark Johnson", specialty: "Internal Medicine", image: "https://via.placeholder.com/60", rating: 4.6 }
  ];

  // Get condition details or use default
  const condition = conditionDetails[slug] || defaultCondition;
  
  // Get doctors or use default
  const doctors = mockDoctors[slug] || defaultDoctors;

  return (
    <div className="2xl:container mx-auto 2xl:border-x">
      <Header />
      <div>
        <FadeInOut>
          <div className="z-0 absolute top-[60px] sm:top-[70px] w-[25%] bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
          <div className="z-0 absolute top-[120px] sm:top-[162px] h-3 w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
          <aside className="mt-[65px] sm:mt-[73px]">
            <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl font-bold">
              {condition.name}
            </h1>
          </aside>
        </FadeInOut>

        <AnimatePage>
          <main className="w-full mt-16 md:mt-24 px-4 sm:px-8 md:px-12 pb-8">
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
          </main>
        </AnimatePage>
      </div>
    </div>
  );
};

export default ConditionDetail;
