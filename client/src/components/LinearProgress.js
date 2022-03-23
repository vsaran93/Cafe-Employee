import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate(props) {
  const { loading } = props;
  return (
    <>
        {loading ? (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        ): null}
    </>
  );
}