import { Typography, Paper, Grid, TextField, Button } from '@mui/material';


function Support() {
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
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
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                 email@example.com
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                555-555-5555
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }

  export default Support;