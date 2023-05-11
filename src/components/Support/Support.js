import React from 'react';
import { Typography, Paper, Grid, TextField, Button, AccordionSummary, Accordion, Box, AccordionDetails } from '@mui/material';


function Support() {
  return (
    <div>
      <Box p={2}>
        <Typography variant="h4" color="darkblue">Support Zone</Typography>
        <Box mt={2}>
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Change &amp; Cancel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you need to change or cancel your booking, please contact our
                customer service team as soon as possible.
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Payment &amp; Receipts</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                For any questions related to payments or receipts, please contact
                our customer service team.
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Refunds</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you are eligible for a refund and have not received it, please
                contact our customer service team.
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Travel Documents</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you have any questions about your travel documents, please
                contact our customer service team.
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Contact Us
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="message"
              label="Message"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Send
            </Button>
          </Grid>
          </Grid>
      </Paper>
    </div>
  );
}

export default Support;
