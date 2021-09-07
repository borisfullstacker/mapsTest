

import { ReactBingmaps } from 'react-bingmaps';
import './MapStyle.css';
import { Button, Row, FormGroup, Form , Label  , Input } from 'reactstrap';
import React, { useState } from "react";
import AsyncSelect from 'react-select/async';

function CoordinateForm({coordChange}) {
  
  const [longitude, setLong] = useState(null);
  const [latitude, setLat] = useState(null);
  const [formState, setFormState] = useState(1);
  const [places, setPlace] = useState("");
  const [options, setOptions] = useState([])
  
const getCountriesList = async (country) => {
      
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`,{method:"GET"})
        return res.json()
    
}

const followTextChange =async (country) =>{
  return new Promise(async (resolve,reject)=>{

      console.log(country)
      // setPlace(country)
      let list = await getCountriesList(country)
      if(list.status!==404){

          list = list.map((ca)=>{
              return {
                  label:ca.name,
                  value:ca.latlng
                }
          })
      }else{
         list = []
      }
      resolve(list)
      console.log('heyy',list)
    //   setOptions(list)


  })

}

const handleInputChange = ({value}) =>{
    console.log(value[0],value[1]);
    setLong(value[0])
    setLat(value[1])
}

const handleSubmit = async (evt) => {
        evt.preventDefault();
        coordChange({longitude,latitude})
   
}

  

  return (
    <Form onSubmit={handleSubmit} >
        <h3>
            Coordinate Form
        </h3>
        <div className='top-form'>
            <p>
                <label >
                        Add by coords
                </label>
                <Input type="radio" name="coords" checked={formState === 1}  value={formState} onChange={e => setFormState(1)}/>
                
            </p>
            <p>
                <label >
                        Add by place
                </label>
               <Input type="radio" name="place"  checked={formState === 2} value={formState} onChange={e => setFormState(2)}/>
            </p>
         </div>
         {formState === 1 && 
         <div>
            <Input type="text" name="longitude" value={longitude} onChange={e => setLong(e.target.value)}/>
            <Input type="text" name="latitude" value={latitude} onChange={e => setLat(e.target.value)}/>

         </div>}
         {formState ===2 && 
            <div>
                <AsyncSelect  isSearchable={true} loadOptions={followTextChange} onChange={(val)=>{handleInputChange(val)}}/>
            </div>
        }
        <div className="bottom-form">
             <Button size="sm" className='btn' color="primary">primary</Button>
        </div>
        
    </Form>
    
  );
}

export default CoordinateForm;
