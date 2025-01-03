import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getSpecialties } from '../api/getSpecialties';

import primary_care from '../assets/icons/primary_care.svg';
import dentist from '../assets/icons/dentistry.svg';
import ob_gyn from '../assets/icons/ob-gyn.svg';
import dermatologist from '../assets/icons/dermatologists.svg';
import psychiatry from '../assets/icons/psychiatrist.svg';
import eye_doctor from '../assets/icons/eye-doctor.svg';

const SPECIALTIES = [
    { name: "Primary Care", image: primary_care, slug: "medical-practitioner" },
    { name: "Dentist", image: dentist, slug: "community-dentistry" },
    { name: "OB-GYN", image: ob_gyn, slug: "obstetrics-and-gynaecology" },
    { name: "Dermatologists", image: dermatologist, slug: "dermatology" },
    { name: "Psychiatry", image: psychiatry, slug: "psychiatry" },
    { name: "Eye Doctor", image: eye_doctor, slug: "ophthalmology" },
];

const TopSearched = () => {
    const navigate = useNavigate();

    const handleSpecialtySearch = async (name, slug) => {
        try {
            const searchResults = await getSpecialties(slug);
            
            const formattedResults = searchResults?.length 
                ? searchResults.map(result => ({
                    id: result.id,
                    firstName: result.first_name,
                    lastName: result.last_name,
                    rating: result.average_rating?.toFixed(1),
                    specialty: result.specialty?.name,
                    specialtyTag: result.specialty?.tag,
                    type: result.facility_type_name,
                    image: result.profile_image,
                    logo: result.logo,
                    typeSlug: result.facility_type_name?.toLowerCase(),
                    name: result.name,
                    slug: result.slug,
                    category: result.category_name,
                    categorySlug: result.category_slug,
                    reviews: result.reviews,
                    reviewCount: result.total_reviews,
                }))
                : [];
            navigate(`/results?search=${name}`, {
                state: {
                    searchParam: name,
                    results: formattedResults,
                },
            });
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Error fetching specialties:", error);
        }
    };

    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-semibold mb-10 text-center'>
                Top-searched specialties
            </h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-4 w-[70%] md:w-[80%] mx-auto'>
                {SPECIALTIES.map((specialty, idx) => (
                    <div  
                        key={idx}
                        onClick={() => handleSpecialtySearch(specialty.name, specialty.slug)}
                        className='flex items-center justify-center flex-col border-[0.5px] bg-green-200 w-full mx-auto gap-3 p-5 md:gap-5 cursor-pointer rounded-lg border-emerald-800'
                    >
                        <div className='w-[55%] md:w-[70%]'>
                            <img 
                                src={specialty.image} 
                                alt={specialty.name || "Specialty image"} 
                                className='w-full' 
                            />
                        </div>
                        <p className='text-sm md:text-md text-center'>{specialty.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopSearched;