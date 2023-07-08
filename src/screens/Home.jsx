import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Upper from "../components/Upper";


const Home = () => {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    // console.log(response[0],response[1]);
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="bg-black bg-gradient">
    <div>
      <Navbar />
    </div>
    <div>
      <Upper/>
    </div>

    <div className="bg-black bg-gradient">
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

        <div className="carousel-inner " id='carousel'>
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center flex-column"> 
             {/* justify-content-center, copy this <form> from navbar for search box */}
             <div className="pb-5 ">
             <h1 style={{fontFamily:"'Belanosima', sans-serif",textAlign:"center",color:"white",fontWeight:700,fontSize:"3rem"}}>Search any Cuisine,dish or food....</h1>
             </div>
            
             <div className="d-flex justify-content-center align-content-center pb-5">
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search whatever you want..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
             </div>
            </div>
          </div>
          <div className="carousel-item active" >
            <img src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-1640772.jpg&fm=jpg" className="d-block w-100  " style={{ backgroundSize:"fill",filter:"brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 " style={{ backgroundSize:"fill" ,filter:"brightness(30%)"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100 " style={{ backgroundSize:"fill",filter:"brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div className='container mt-2 bg-black bg-gradient' > {/* boootstrap is mobile first */}
      {
        foodCat !== []
          ? foodCat.map((data) => {
            return (
              // justify-content-center
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3' style={{fontFamily:"'Belanosima', sans-serif"}}>
                  {data.CategoryName}
                </div>
                {/* <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} /> */}
                {foodItems !== [] ? foodItems.filter(
                  (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems.id} className='col-12 col-md-6 col-lg-3' style={{fontFamily:"'Belanosima', sans-serif"}}>
                       
                        <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                      </div>
                    )
                  }) : <div> No Such Data </div>}
              </div>
            )
          })
          : ""}
    </div >
    <Footer />
  </div>
  );
};

export default Home;
