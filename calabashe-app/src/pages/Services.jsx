import AnimatePage from "../components/AnimatePage";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Services = () => {
  return ( 
    <>
      <Header/>
      <AnimatePage>
        <main className="font-helvetica font-semibold subpixel-antialiased text-2xl h-[100vh] flex justify-center items-center">
          <p >Yayy! Services!! 💉 🚑</p>
        </main>
      </AnimatePage>
      <Footer/>
    </>
   );
}
 
export default Services;