

import { ReactBingmaps } from 'react-bingmaps';
import './MapStyle.css';
import { Button, Row, FormGroup, Form , Label  , Input, Col } from 'reactstrap';
import React, { useState } from "react";
import AsyncSelect from 'react-select/async';

function CoordinateForm({coordChange}) {
  
  const [longitude, setLong] = useState('');
  const [latitude, setLat] = useState('');
  const [formState, setFormState] = useState(1);
  const [place, setPlace] = useState({value:'',label:''});
  const [options, setOptions] = useState([])
  
const getCountriesList = async (country) => {
      
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`,{method:"GET"})
        return res.json()
    
}

const followTextChange =async (country) =>{
  return new Promise(async (resolve,reject)=>{
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
  })

}

const handlePlaceChange = (e) =>{
   setPlace(e)
}



const handleCoordinateChange = (evt) =>{
      switch (evt.target.name) {
        case 'longitude':
          setLong(evt.target.value?parseFloat(evt.target.value):'')
            break;
        case 'latitude':
          setLat(evt.target.value?parseFloat(evt.target.value):'')
            break;
        default:
          break;
      }

}

const handleSubmit = async (evt) => {
  evt.preventDefault();
  let lo = longitude;
  let la = latitude;
  if(formState === 2){
     lo = place.value?place.value[0]:undefined
     la = place.value?place.value[1]:undefined
  }

  coordChange({longitude:lo,latitude:la})      



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
               <Input type="radio" name="place"  checked={formState === 2}   value={formState} onChange={e => setFormState(2)}/>
            </p>
         </div>
         {formState === 1 && 
         <div>

            <Row>
                <Col md='12'>
                <Input type="text" name="latitude" value={latitude} placeholder='long' onChange={e => { handleCoordinateChange(e)}}/>
                </Col>
            </Row>
            <Row>
              <Col md='12'>
                <Input type="text" name="longitude" value={longitude} placeholder='lat' onChange={e =>{ handleCoordinateChange(e)}}/>
                </Col>

            </Row>
         </div>
         }

         {formState ===2 && 
            <div>
                 <Row>

                  <Col md='12'>
                    <AsyncSelect name='places'  isSearchable={true} loadOptions={followTextChange} value={place} onChange={val =>{handlePlaceChange(val)}}/>
                  </Col>
                </Row>
            </div>
        }
        <div className="bottom-form">
             <Button size="sm" className='btn' color="primary">submit</Button>
        </div>
        
    </Form>
    
  );
}

export default CoordinateForm;
