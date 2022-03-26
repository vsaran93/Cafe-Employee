import React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldArea = ({ name, value, onChange, ...props }) => {
    return (
        <TextField
            name={name}
            fullWidth 
            id="standard-basic" 
            variant="standard"
            value={value || ''}
            onChange={onChange}
            {...props}
        />
    )
}

export default TextFieldArea;
