import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


 const SingleSelect=({arr,label,type,value,onBlur,onChange,name,helpertext})=> {



    SingleSelect.propTypes = {
        arr:PropTypes.isRequired,
        label:PropTypes.string.isRequired,
        type:PropTypes.isRequired,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        helperText:PropTypes.node,
        value:PropTypes.string,
        name:PropTypes.string.isRequired,
        helpertext:PropTypes.node,
    }

    const isArrayOfObjects = (array) => {
      return array.length > 0 && typeof array[0] === 'object';
    };
    
    const isObjArray = isArrayOfObjects(arr);

    //  console.log("is object",arr);


    return (
      <div>
        {isObjArray ? (
          <Autocomplete
          // disablePortal
          id="combo-box-demo"
          options={arr}
          // getOptionLabel={(option) => option.label }  // This tells Autocomplete how to display each option
          // isOptionEqualToValue={(option, value) => option.value === value.value}
          sx={{ width: 250 }}
            value={value}
            type = {type}
            onChange={onChange}
            onBlur={onBlur}
            helpertext={helpertext}
            name ={name}
          renderInput={(params) => <TextField 
            
            {...params} label={label} />}
        />
        ) : (
          <Autocomplete
            sx={{ width: '250px' }}
            id="combo-box-demo"
            options={arr}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label={label} />}
            value={value}
            onBlur={onBlur}
            onChange={(event, newValue) => onChange(event, newValue)}
            helpertext={helpertext}
          />
        )}
      </div>
    );
}


export default SingleSelect;