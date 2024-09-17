import { useInView } from "framer-motion";
import SearchBarMd from "../components/SearchBarMd";
import { useState, useRef } from "react";
import BannerSearch from "../components/bannerSearchMd";

const ShowMdSearch = () => {
  const [isHidden, setIsHidden] = useState(false)
  const searchRef = useRef(null);
  const isInView = useInView(searchRef, { once: false });

  useState(() => {
    setIsHidden(isInView);
  }, [isInView]);

  return (
    <>
      <SearchBarMd hidden={false}/>
      <BannerSearch ref={searchRef}/>
    </>
   );
}
 
export default ShowMdSearch;