import React from 'react';
import { Typography, Paper, Grid, TextField, Button, AccordionSummary, Accordion, Box, AccordionDetails } from '@mui/material';


function Support() {
  return (
    <div>
      <Box p={2}>
        <Typography variant="h4" color="">Welcome to Support Zone</Typography>
        <Box mt={2}>
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Change &amp; Cancel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you need to change or cancel your booking, please contact our
                customer service team as soon as possible.
                <h5>Refund timelines, policies & processes</h5>
                <p>
                  It may take up to 24 hours to process your refund. Once that has happened, your bank or payment service (such as PayPal) will take care of the rest. Just know that it may take them up to 7 days to post the credit to your account, and up to 2 billing cycles to show the credit on your statement.</p>
                <p>You’ll see the refund on your original method(s) of payment. So, say you paid using your debit card -- that’s where the money will be refunded. We’ll send you an email with the nitty-gritty about your refund amount, and how and when you'll get it.</p>
                <p>
                  If your credit card statement includes a charge from a third party (such as a low-cost airline, rental car company, or cruise line), you’ll receive your refund from them, not from us. If this is the case, get in touch with that third party to ask any questions about refunds.</p>
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
                <h5>Refund timelines, policies & processes</h5>
                <p>
                  It may take up to 24 hours to process your refund. Once that has happened, your bank or payment service (such as PayPal) will take care of the rest. Just know that it may take them up to 7 days to post the credit to your account, and up to 2 billing cycles to show the credit on your statement.</p>
                <p>You’ll see the refund on your original method(s) of payment. So, say you paid using your debit card -- that’s where the money will be refunded. We’ll send you an email with the nitty-gritty about your refund amount, and how and when you'll get it.</p>
                <p>
                  If your credit card statement includes a charge from a third party (such as a low-cost airline, rental car company, or cruise line), you’ll receive your refund from them, not from us. If this is the case, get in touch with that third party to ask any questions about refunds.</p>
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
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Destination Services</Typography>
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
          <Accordion>
            <AccordionSummary >
              <Typography variant="h6">Travel Alerts</Typography>
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
    </div>
  );
}

export default Support;
