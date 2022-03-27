import React from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    selectList: {
        paddingTop: 2,
        paddingBottom: 2
    }
});

const CafeFilter = ({ cafes, onFilterTextChange, selectedCafe, clearFilter }) => {
    const styles = useStyles();
    return(
        <Grid container spacing={{ xs: 2, md: 3 }}  maxWidth="sm">
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <NativeSelect
                        label="Cafe"
                        onChange={onFilterTextChange}
                        value={selectedCafe || ''}
                        className={styles.selectList}
                    >
                        <option value={null}>Selected Cafe</option>
                        {cafes.map((cafe) => (
                            <option value={cafe.name}>{cafe.name}</option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button onClick={clearFilter} variant="outlined" color="error">Clear Filter</Button>
            </Grid>
        </Grid>
    )
}

export default CafeFilter;
