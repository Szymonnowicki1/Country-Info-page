import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./BasicSelect.css"
export default function BasicSelect({selectedRegion,setSelectedRegion}) {
  const [region, setRegion] = React.useState("All");

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          sx={{height: 45}}
          className='select'
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}