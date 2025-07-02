import AnimatePage from "../components/AnimatePage";
import { FadeInOut } from "../components/ComponentAnimations";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Conditions = () => {
  // Alphabet array
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  // Hardcoded conditions data (sample data organized by alphabet)
  const conditionsByLetter = {
    "A": ["Asthma", "Arthritis", "Alzheimer's Disease", "Anemia"],
    "B": ["Bronchitis", "Back Pain", "Blood Pressure (High)", "Bipolar Disorder"],
    "C": ["Cancer", "COVID-19", "Cholesterol", "Chronic Fatigue Syndrome"],
    "D": ["Diabetes", "Depression", "Diarrhea", "Dengue Fever"],
    "E": ["Eczema", "Epilepsy", "Ear Infection", "Endometriosis"],
    "F": ["Flu", "Fibromyalgia", "Fever", "Food Poisoning"],
    "G": ["Gallstones", "Gout", "Glaucoma", "Gastritis"],
    "H": ["Hypertension", "Heart Disease", "Headache", "HIV/AIDS"],
    "I": ["Insomnia", "Irritable Bowel Syndrome", "Inflammation", "Infection"],
    "J": ["Jaundice", "Joint Pain", "Juvenile Arthritis", "Jet Lag"],
    "K": ["Kidney Disease", "Knee Pain", "Kawasaki Disease"],
    "L": ["Lupus", "Liver Disease", "Lymphoma", "Leukemia"],
    "M": ["Migraine", "Multiple Sclerosis", "Malaria", "Measles"],
    "N": ["Nausea", "Narcolepsy", "Neurological Disorders", "Nutrient Deficiency"],
    "O": ["Osteoporosis", "Obesity", "Obsessive-Compulsive Disorder", "Osteoarthritis"],
    "P": ["Pneumonia", "Parkinson's Disease", "Psoriasis", "PTSD"],
    "Q": ["Q Fever", "Quadriplegia"],
    "R": ["Rheumatoid Arthritis", "Respiratory Infections", "Rabies", "Rosacea"],
    "S": ["Stroke", "Schizophrenia", "Sinusitis", "Sleep Apnea"],
    "T": ["Tuberculosis", "Thyroid Problems", "Tonsillitis", "Tetanus"],
    "U": ["Ulcers", "Urinary Tract Infection", "Urticaria", "Uveitis"],
    "V": ["Varicose Veins", "Vertigo", "Vitiligo", "Viral Infections"],
    "W": ["Weight Loss", "Whooping Cough", "Wilson's Disease"],
    "X": ["Xerosis", "X-Linked Disorders"],
    "Y": ["Yellow Fever", "Yeast Infection"],
    "Z": ["Zika Virus", "Zinc Deficiency"]
  };

  return (
    <div className="2xl:container mx-auto 2xl:border-x">
      <Header />
      <div className="">
        <FadeInOut>
          <div className="z-0 absolute top-[60px] sm:top-[70px] w-[25%] bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
          <div className="z-0 absolute top-[120px] sm:top-[162px] h-3 w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
          <aside className="mt-[65px] sm:mt-[73px]">
            <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl font-bold">
              Medical Conditions <br /> Directory
            </h1>
          </aside>
        </FadeInOut>

        <AnimatePage>
          <main className="w-full mt-16 md:mt-24 px-4 sm:px-8 md:px-12 pb-8">
            {/* Alphabet navigation */}
            <div className="sticky top-14 z-30 bg-white py-4 border-b shadow-sm">
              <div className="flex flex-wrap justify-center">
                {alphabets.map((letter) => (
                  <a 
                    key={letter} 
                    href={`#${letter}`} 
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#04DA8D] hover:text-white transition-colors font-semibold text-sm sm:text-base"
                  >
                    {letter}
                  </a>
                ))}
              </div>
            </div>

            {/* Conditions listed by alphabet */}
            <div className="mt-8">
              {alphabets.map((letter) => (
                <div key={letter} id={letter} className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                    {letter}
                  </h2>
                  {conditionsByLetter[letter] && conditionsByLetter[letter].length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {conditionsByLetter[letter].map((condition, index) => (
                        <Link 
                          key={index}
                          to={`/conditions/${condition.toLowerCase().replace(/ /g, '-')}`}
                          className="block p-4 bg-white rounded-lg shadow-sm border hover:border-[#04DA8D] transition-colors cursor-pointer"
                        >
                          <h3 className="font-medium text-base text-gray-800">{condition}</h3>
                          <p className="text-sm text-gray-500 mt-1">Learn more about treatments and symptoms</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No conditions listed for this letter</p>
                  )}
                </div>
              ))}
            </div>
          </main>
        </AnimatePage>
      </div>
    </div>
  );
};

export default Conditions;
