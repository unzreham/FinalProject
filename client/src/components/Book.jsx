import React, { useState,useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import PartialNav from "./PartialNav"
const Book = (props) => {

  const responseGoogle = (response) => {
    console.log("reham success");
  
      console.log(response.profileObj);
      setEmail(response.profileObj.email)
      setFirstName(response.profileObj.name)
      this.setState({ disabled: "painted" })
    }
  
const  responseGoogle2 = (response) => {
      console.log("reham failure");
  
      console.log(response);
    }





    
    const [adult, setAdult]              = useState()  //      
    const [child, setChild]              = useState()  //     
    const [firstName, setFirstName]      = useState()  //    
    const [lastName, setLastName]      = useState()  //   
    const [email, setEmail]      = useState()  //    
 
    const [tourId, setTourId]                    = useState(props.pk)  
    const [msg, setMessageSubmit]                = useState () //
    const [TourData, setTourData] = useState([])
    const [included, setincluded] = useState({})


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit")
        // setjwtStr(Storage.get("token"))
        // const config = {
        //     headers: { Authorization: `Bearer ${jwtStr}` }
        // };
        const addBook=
        {

          "adult": adult,
          "child": child,
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "tourId": tourId
          }
     
         
        
      
        axios
          .post('https://localhost:44364/api/Bookings',addBook )
          .then((res) => {
          setMessageSubmit("Your booking has been submitted") } )
            .catch((err) =>  setMessageSubmit("Not Submitted")
            );
    }



    useEffect(() => {
        getTour();
    
      },[ ]);
      
      const getTour=()=>{
        axios
        .get(`https://localhost:44364/api/AllTours/${props.pk}/?format=json`)
        .then((res) => {
            setTourData(res.data)
            setincluded(res.data.included)
            console.log(res.data)
          })
        .catch((err) => console.error(err));
      }




    return (
        <div>
 
<PartialNav />



<div className="container-md ">
<GoogleLogin
  clientId="398296389829-ukici9lqlsjfu4soj6rl44fblhln277n.apps.googleusercontent.com"
  onSuccess={responseGoogle}
  onFailure={responseGoogle2}
    cookiePolicy={'single_host_origin'}
  isSignedIn={true}

/>
<div class="card col-md-12 p-3">
        <div class="row ">

        <div class="col-md-8">
                <div class="card-block">
                    <h6 class="card-title text-right">{TourData.place}</h6>
                    <p class="card-text text-justify">{TourData.description}.</p>
                </div>

                <div>
                    <h5>included</h5>




         {(() => {   
           if (included.food == true) {
          return (<p> Food   &#9989; </p>)
         } else { return (<p> Food  &#10060; </p>)}

        })()}
         {(() => {  
            if (included.entiranceFees == true) {
              return (<p> Entirance Fees   &#9989; </p>)
          } else { return (<p> Entirance Fees  &#10060; </p>)}

        })()}
          {(() => {  
          if (included.transport == true) {
            return (<p> Transport   &#9989; </p>)
        } else { return (<p> Transport  &#10060; </p>)}
      })()}
        {(() => {  
        if (included.pickUpAndDrop == true) {
          return (<p> pickUp and Drop   &#9989; </p>)
      } else { return (<p> pickUp and Drop  &#10060; </p>)}
      })()}





                  {/* <p>{CityInfo.name}</p>
                  <p>{CityInfo.description}</p>
                  <p>{CityInfo.Population}</p> */}

                  <p></p>

                </div>
            </div>


            <div class="col-md-4">
                <img class="" src={TourData.imageSrc} style={{width: "300px", height:"300px" }} />
            </div>



         </div>




 </div>
 </div>

 <div class="row">
    <div class="col">
    
    </div>
    <div class="col-5">
    

<form>
  <div class="form-group">
    <label for="formGroupExampleInput">FirstName</label>
    <input type="text" class="form-control" id="formGroupExampleInput"  onChange = {(e)=>setFirstName(e.target.value)} value ={firstName} />
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">LastName</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" onChange = {(e)=>setLastName(e.target.value)}  />
  </div>


  <div class="form-group">
    <label for="formGroupExampleInput2">email</label>
    <input type="email" class="form-control" id="formGroupExampleInput2" onChange = {(e)=>setEmail(e.target.value)}  value ={email} />
  </div>

  <div class="form-group">
    <label for="formGroupExampleInput2">Adult</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" onChange = {(e)=>setAdult(e.target.value)}  />
  </div>

  <div class="form-group">
    <label for="formGroupExampleInput2">Child</label>
    <input type="number" class="form-control" id="formGroupExampleInput2" onChange = {(e)=>setChild(e.target.value)}  />
  </div>

  <button className="btn mb-4" id = "Charbtn" type='submit' onClick = {handleSubmit}>Book</button>
 <p>{msg}</p>
</form>
</div>
    <div class="col">
    </div>
  </div>



            
        </div>
    );
};

export default Book;