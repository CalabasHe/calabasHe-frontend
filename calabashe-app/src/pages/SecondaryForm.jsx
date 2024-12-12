import Header from "../components/Header";
import SecondaryFormCard from "../components/secondaryFormCard";

const SecondaryForms = () => {

  return (
    <div className="2xl:container mx-auto">
      <Header />
      <main className="my-[10vh] md:my-[7vh] lg:my-[15vh] w-full  px-2 md:px-12 lg:px-16 space-y-8">
        <SecondaryFormCard/>
      </main>
    </div>
  );
};

export default SecondaryForms;
