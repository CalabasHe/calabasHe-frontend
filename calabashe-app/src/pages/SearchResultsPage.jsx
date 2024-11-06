import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchResultsPageLG from "../components/SearchResultsPageMD";
import SearchResultsPageSM from "../components/SearchResultsPageSM";
import AnimatePage from "../components/AnimatePage";

const SearchResultsPage = () => {
  return (
    <div className="2xl:container mx-auto 2xl:border-x">
      <Header />
      <AnimatePage>
        <SearchResultsPageLG />
        <SearchResultsPageSM />
      </AnimatePage>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
