import { useEffect, useState } from "react";
import { fetchSpecialties } from "../api/getCategoriesData";

const Specialty = () => {
  const [parents, setParents] = useState()

  useEffect(()=>{
  const getSpecialtyData = async () => {
    try{
      const data = await fetchSpecialties()
      setParents(data.results)
      console.log(parents)
    }catch(err){
      console.log(err)
    }
  }
  getSpecialtyData()
  }, [])
  return ( 
    <>
      <section className="relative w-full max-lg:hidden rounded-lg">
          {/* <span className="absolute h-2 bottom-0 w-full bg-black/70 rounded-b-[inherit]"/> */}
        <div className=" bg-white py-8 rounded-[inherit] pl-8 pr-2 space-y-6 border w-full h-fit max-h-[75vh] scrollbar-thin overflow-y-scroll">
          <div className="">
            <h2 className="font-semibold text-lg">Specialties</h2>
            <p className="text-sm text-slate-500 italic">Choose a specialty</p>
          </div>
          <ul className="flex gap-2 text-xs flex-wrap">
            <li className="border border-black flex items-center p-1 px-3 rounded-2xl">
              <span>All</span>
            </li>
            {
              parents && (
                parents.map((parent) => (
                  <>
                    <li key={parent.id} className="border border-black flex gap-1 items-center p-1 px-2 rounded-[9999px]">
                      <span>{parent.name}</span>
                      <span id="count" className="bg-gray-500 py-0.5 text-white px-2 rounded-full">{parent.total_doctor_count}</span>
                    </li>
                  </>
                ))
              )
            }
          </ul>
        </div>
      </section>
    </>
   );
}
 
export default Specialty;