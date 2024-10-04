import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchResultsPageLG from "../components/SearchResultsPageMD";
import AnimatePage from "../components/AnimatePage";

const SearchResultsPage = () => {
  return (
    <>
      <Header />
      <AnimatePage>
        <SearchResultsPageLG />
      </AnimatePage>

      <Footer />
    </>
  );
};

export default SearchResultsPage;
