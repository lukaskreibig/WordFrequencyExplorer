import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { WordCountGrid } from './components/WordCountGrid/WordCountGrid';
import { Fade } from '@mui/material';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Fade in={true} appear={true}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign={"center"}>
            WordCountExplorer        
          </Typography>
          <WordCountGrid />
        </Box>
      </Fade>

    </Container>
  );
}
