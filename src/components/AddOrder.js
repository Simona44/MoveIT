import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';
import { calculateDistanceExpenses, calculateVolumeExpenses } from '../utils/actions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddOrder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '', 
    addressFrom: '',
    addressTo: ''
  });
  const [distance, setDistance] = useState(0);
  const [distanceExpenses, setDistanceExpenses] = useState(0);
  const [area, setArea] = useState({
    livingArea: 0,
    atticArea: 0
  });
  const [volumeExpenses, setVolumeExpenses] = useState(0);
  const [pianoStatus, setPianoStatus] = useState(false);
  const [pianoExpences, setPianoExpences] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [distanceAlert, setDistanceAlert] = useState(false);
  const [areaAlert, setAreaAlert] = useState(false);

  const { addOrder } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setPianoStatus((event.target.value))
  };

  const handlePersonalInfo = function(e){
    setPersonalInfo({
      ...personalInfo, 
      [e.target.name]: e.target.value
    });
  };

  const handleArea = function(e){
    setArea({
      ...area, 
      [e.target.name]: e.target.value
    });
  };

  function placeOrder() {
    const newOrder = {
      id: Math.floor(Math.random() * 100000000),
      name: personalInfo.name,
      email: personalInfo.email,
      from: personalInfo.addressFrom,
      to: personalInfo.addressTo,
      distance: distance,
      livingArea: area.livingArea,
      atticArea: area.atticArea,
      piano: pianoStatus,
      total: distanceExpenses + volumeExpenses + pianoExpences
    };

    addOrder(newOrder);
    navigate(`/orders/${newOrder.id}`);
  }

  function calculatePrice(){
    if (distance <= 0) {
      setDistanceAlert(true);
      return;
    }
    if (area.livingArea <= 0 && area.atticArea <= 0) {
      setAreaAlert(true);
      return;
    }
    setDistanceExpenses(calculateDistanceExpenses(distance));
    setVolumeExpenses(calculateVolumeExpenses(area));
    let totalPianoExpences = 0;
    if (pianoStatus) {
      totalPianoExpences = 5000;
    }
    setPianoExpences(totalPianoExpences)
    setDisabled(false);
  }

  return (
    <div className="wrapper">
      <h2>Fill in the following form and you will get a price proposal</h2>
      <div className="row">
        <h4 className="sub-header">Personal information</h4>
        <TextField
          id="outlined"
          margin='dense'
          label="Full Name"
          InputLabelProps={{
            shrink: true
          }}
          name="name"
          value={personalInfo.name}
          onChange={handlePersonalInfo}
          sx={{ width: '70%' }}
        />
        <TextField
          id="outlined"
          margin='dense'
          label="E-mail"
          InputLabelProps={{
            shrink: true
          }}
          name="email"
          value={personalInfo.email}
          onChange={handlePersonalInfo}
          sx={{ width: '70%' }}
        />
        <h4 className="sub-header">Distance</h4>
        <TextField
          id="outlined-number"
          margin='dense'
          label="Address from"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          name="addressFrom"
          value={personalInfo.addressFrom}
          onChange={handlePersonalInfo}
          sx={{ width: '70%' }}
        />
        <TextField
          id="outlined-number"
          margin='dense'
          label="Address to"
          type="text"
          InputLabelProps={{
            shrink: true
          }}
          name="addressTo"
          value={personalInfo.addressTo}
          onChange={handlePersonalInfo}
          sx={{ width: '70%' }}
        />
        <TextField
          id="outlined-number"
          margin='dense'
          label="Distance"
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
          sx={{ width: '70%' }}
        />
        <h4 className="sub-header">Volume</h4>
        <TextField
          id="outlined-number"
          margin='dense'
          label="Living Area in m2"
          type="number"
          name="livingArea"
          InputLabelProps={{
            shrink: true
          }}
          value={area.livingArea}
          onChange={handleArea}
          required
          sx={{ width: '30%' }}
        />
        <TextField
          id="outlined-number"
          margin='dense'
          label="Attic Area in m2"
          type="number"
          name="atticArea"
          InputLabelProps={{
            shrink: true
          }}
          value={area.atticArea}
          onChange={handleArea}
          required
          sx={{ width: '30%', marginLeft: "10%" }}
        />
        <FormControl sx={{ width: '45%'}}>
          <FormLabel id="demo-controlled-radio-buttons-group">Do you have piano?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={pianoStatus}
            onChange={handleChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
      <p className="total-price">{distanceExpenses + volumeExpenses + pianoExpences} SEK</p>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={calculatePrice}>Calculate Price</Button>
        <Button variant="outlined" onClick={placeOrder} disabled={disabled}>Place Order</Button>
        
        <Snackbar open={distanceAlert} autoHideDuration={4000} onClose={() => setDistanceAlert(false)}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Distance has to be a positive value!
          </Alert>
        </Snackbar>
        <Snackbar open={areaAlert} autoHideDuration={4000} onClose={() => setAreaAlert(false)}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Make sure correct area size is inserted!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
};

export default AddOrder;
