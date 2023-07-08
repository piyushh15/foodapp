import React, { useEffect, useState,useRef} from "react";
import { useDispatchCart,useCart } from "./Contextreducer";



const Card = (props) => {
  let data = useCart();

  //usestate to store the default values
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const priceRef = useRef();  

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;

  const dispatch = useDispatchCart();

  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])


  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

  }

  
  let finalPrice=qty* parseInt(options[size]);


  return (
    <div className="mt-3">
      <div className="card p-3" style={{ width: " 18rem", maxHeight: "400px",background:"black",borderRadius:"10px",marginRight:"3px"}}>
        <img className="card-img-top" src={props.ImgSrc} alt="" style={{"height":"200px","objectFit":"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}  onChange={(e)=>setQty(e.target.value)}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 w-20 text-black rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}style={{ select: "#FF0000" }} >
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            
          </div>
          <hr></hr>
            <button className="btn btn-success justify-content ms-2"style={{backgroundColor: "#F2BE22 ",border:"none"}} onClick={handleAddToCart}  >Add to Cart</button>
         
         
        </div>
      </div>
    </div>
    
  );
};

export default Card;


//context api-solves the problem of prop drilling  
//if any action is performed onn home page then data is updated on every page which is or not connected to home page

//usereducer-as there are multiple add to cart buttons on page so we have to create a lot of use state to handle every button so to avoid this
//we use useReducer


