import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { width } from "@mui/system";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Hotels" {...a11yProps(0)} />
          <Tab label="Flights" {...a11yProps(1)} />
          <Tab label="Cars" {...a11yProps(2)} />
          <Tab label="Restaurants" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="input-hotels">
          <Container maxWidth="sm">
            <TextField
              fullWidth
              id="standard-basic"
              label="Search a place to stay"
              variant="standard"
            />
          </Container>
        </div>
        <div className="dates">
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            centered
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Check-in" sx={{ m: 2 }} />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Check-Out" sx={{ m: 2 }} />
              </DemoContainer>
            </LocalizationProvider>
          </Container>
          <Button
            variant="contained"
            component="label"
            color="primary"
            size="large"
            sx={{ width: "13%", mt: 1 }}
            margin="normal"
          >
            Search
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Flights
      </TabPanel>
      <TabPanel value={value} index={2}>
        Cars
      </TabPanel>
      <TabPanel value={value} index={3}>
        Restaurants
      </TabPanel>
    </Box>
  );
}
