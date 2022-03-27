import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const RadioButton = ({ name, value, handleChange, ...props }) => {
    return (
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name={name}
            value={value}
            onChange={handleChange}
            defaultValue="male"
            {...props}
        >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
    )
}

export default RadioButton;