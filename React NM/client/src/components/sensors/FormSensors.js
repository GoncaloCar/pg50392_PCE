import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    ><div>
        <TextField
          required
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Sensor ID"
          
        />
        <TextField
          required
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Número de sensor"
        />
        </div>
    </Box>
  )}