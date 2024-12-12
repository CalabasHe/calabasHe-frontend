import Header from "./Header";

const LoadingAnimation = ( ) => {
  return ( 
    <>
      <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <Header/>
      <h1 className="text-black text-2xl sm:text-4xl font-bold animate-bounce">
          Calabas<span className="text-[#04DA8D]">he</span>
        </h1>
      </div>
    </>
   );
}
 
export default LoadingAnimation;