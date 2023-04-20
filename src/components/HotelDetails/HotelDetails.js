import React from "react";
import {  useNavigate } from "react-router-dom"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from "react";
// import Grid from '@mui/material/Grid';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import "./List.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import TextField from "@mui/material/TextField";
import FormControll from "./FormControll";
import FormControll1 from "./FormControll1";
import Axios from "axios";

function HotelDetails() {
  const navigate = useNavigate()
  const imageData = [
    {
      label: "Image 1",
      alt: "image1",
      url: "https://www.hotel-europapark.com/uploads/tx_tiranacontent/Location_thumbnail.jpg",
    },
    {
      label: "Image 2",
      alt: "image2",
      url: "https://internationaltravelandtours.com/wp-content/uploads/2018/11/rogner-hotel-tirana-14.jpg",
    },
    {
      label: "Image 3",
      alt: "image3",
      url: "https://www.il.kayak.com/rimg/himg/2e/98/ea/ice-53448-79534344_3XL-431847.jpg?width=720&height=576&crop=true",
    },
    {
      label: "Image 4",
      alt: "image4",
      url: "https://q-xx.bstatic.com/xdata/images/hotel/max500/262050932.jpg?k=3ba04fe8ea13f1ab7ce6126594a441742682a957f2471db001b2d298ad345216&o=",
    },
    {
      label: "Image 5",
      alt: "image4",
      url: "https://www.hotel-europapark.com/uploads/tx_tiranacontent/Restaurant_apollonia_thumbnail.jpg",
    },
    {
      label: "Image 6",
      alt: "image4",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiz3TZEeZSvILvK26R65K5H43XBOGaaTwfMQ&usqp=CAU",
    },
    {
      label: "Image 7",
      alt: "image4",
      url: "https://www.kayak.com/rimg/himg/a3/f3/31/expediav2-9739-164241812-326910.jpg?width=1366&height=768&crop=true",
    },
  ];

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img src={image.url} alt={image.alt} />
      {/* <p className="legend">{image.label}</p> */}
    </div>
  ));

  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <div>
      <Box
        sx={{
          mx: "auto",
          mt: 4,
          width: "90%",
        }}
      >
        <div
          sx={{
            textAlign: "center",
            margin: 2,
          }}
        >
          <Box sx={{ fontWeight: "bold", fontSize: 50 }}>
            Hotel Rogner Europa Park
          </Box>
          <h6>
            <LocationOnIcon sx={{ fontSize: 50 }} />
            Bulevardi Deshmoret e Kombit, 1000 Tirana, Albania
          </h6>
          <StarOutlineIcon sx={{ color: "pink", fontSize: 50 }} />
          <StarOutlineIcon sx={{ color: "pink", fontSize: 50 }} />
          <StarOutlineIcon sx={{ color: "pink", fontSize: 50 }} />
          <StarOutlineIcon sx={{ color: "pink", fontSize: 50 }} />
          <StarOutlineIcon sx={{ color: "pink", fontSize: 50 }} />
        </div>

        {/* <p sx={{fontWeight: bold,}}>prove per text</p> */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="container-1">
              <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                selectedItem={imageData[currentIndex]}
                onChange={handleChange}
                stopOnHover={true}
                className="carousel-container"
              >
                {renderSlides}
              </Carousel>
            </div>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              mx: "auto",
              mt: 10,
              maxWidth: "90%",
            }}
          >
            <Box
              className="container-2"
              sx={{
                bgcolor: "warning.main",
                textAlign: "start",
                p: 3,
              }}
            >
              <h2>An oasis in the city center of Tirana.</h2>
              <br />
              <Typography
                sx={{
                  fontFamily: "Cursive",
                }}
              >
                In the midst of greenery{" "}
              </Typography>
              <br />
              <Typography
                sx={{
                  fontFamily: "Cursive",
                }}
              >
                Our unique Mediterranean garden is simply beautiful and invites
                you to relax and rejuvenate during your stay at the Rogner
                Hotel. Located at the Tirana’s best and most beautiful boulevard
                in the very centre of the town, our hotel is yet surrounded by
                marvellous nature.{" "}
              </Typography>
              <br />
              <br />
              <Typography
                sx={{
                  fontFamily: "Cursive",
                }}
              >
                {" "}
                For all sports enthusiasts there is a tennis court that may be
                used throughout the year and a putting green. The swimming pool
                tempts you to a refreshing splash and perhaps a visit to the
                Bubbles Pool Bar for a drink or a cocktail during your stay in
                Tirana.
              </Typography>

              {/* <TableList /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <FormControl
        sx={{
          display: "flex",
          // bgcolor: "warning.main",
          maxWidth: "80%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          p: 5,
          mx: "auto",
          borderRadius: 2,
        }}
      >
        <TextField type="text" color="primary" defaultValue="From" />
        <TextField type="text" color="secondary" defaultValue="Until" />
        <FormControll />
        <FormControll1 />
        <Button variant="contained" color="success" onClick={() => navigate("/InsideRoom/")}>BOOK NOW</Button>
      </FormControl>
      
    </div>
  );
}

export default HotelDetails;
