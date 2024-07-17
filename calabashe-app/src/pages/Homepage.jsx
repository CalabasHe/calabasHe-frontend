import Header from "../components/Header";

const Home = () => {
  return ( 
      <div>
        <Header/>
        <main className='h-[100vh] flex flex-col px-2 items-center justify-center'>
          {/* <Review/>        */}

          <h1 className="text-6xl font-black animate-bounce ">Calabas<span className="text-[#0B7F85]">He</span></h1> 

        </main>
      </div>
    )
}
 
export default Home;