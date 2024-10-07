import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchResultsPageLG from "../components/SearchResultsPageMD";
import SearchResultsPageSM from "../components/SearchResultsPageSM";
import AnimatePage from "../components/AnimatePage";

const SearchResultsPage = () => {
  return (
    <>
      <Header />
      <AnimatePage>
        <SearchResultsPageLG />
        <SearchResultsPageSM />
      </AnimatePage>

      <Footer />
    </>
  );
};

export default SearchResultsPage;
