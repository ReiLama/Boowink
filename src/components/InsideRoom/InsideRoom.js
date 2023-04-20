import React from "react";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import BathroomIcon from '@mui/icons-material/Bathroom';
import { Box, Grid, FormControl, Typography, Button } from "@mui/material";

function InsideRoom() {
    const imageData = [
        { label: "Image 1",
          alt: "image1",
          url:"https://bookings.travelclick.com/assets/hotel/77024/media/room/detail-image/rogner-hotel-suite11_enhanced.jpg"},
        { label: "Image 2",
          alt: "image2",
          url:"https://bookings.travelclick.com/assets/hotel/77024/media/room/detail-image/img_015_1395761764650_enhanced.jpg"},
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
                    <h1><BedroomParentIcon sx={{ fontSize: 50 }}/>Rooms</h1>

                    <Box sx={{ mx:'auto', mt:4, width: '90%', }}>
                        
                        <Grid container spacing={2} sx={{ mx:'auto', mt:4, width: '90%', }}>

                                <Grid item xs={12} md={4}>
                                <Carousel showArrows={true}
                                            autoPlay={true}
                                            infiniteLoop={true}
                                            selectedItem={imageData[currentIndex]}
                                            onChange={handleChange}
                                            stopOnHover={true}
                                        className="carousel-container"
                                >
                                {renderSlides}
                                </Carousel>
                                </Grid  >
                                <Grid item xs={12} md={4} sx={{textAlign: 'start'}}>
                                     <h3>Standard Double Room</h3>
                                        <p>Double rooms with view over the most beautiful boulevard in Tirana,
                                        24 m2, 1st to the 4th floor,
                                        complimentary coffee and tea,
                                        air-condition, twin or king-size bed,
                                        insolating windows, safe, minibar,
                                        telephone, LCD screen- satellite TV,
                                        business-desk, complimentary Wi-Fi.
                                        </p>
                                     <h5 ><PeopleOutlineIcon sx={{ fontSize: 50 }} />3  People</h5>
                                     <p >  
                                        <WifiIcon sx={{ fontSize: 50 }}/>    
                                        <LocalCafeIcon sx={{ fontSize: 50 }}/>    
                                        <BathroomIcon sx={{ fontSize: 50 }}/>   
                                    </p>
                                </Grid>
                                <Grid item xs={12} md={4} sx={{textAlign: 'start'}}>
                                     <Typography sx={{textDecoration: 'underline', color: 'red', m:2,}}>Price : 386 Euro</Typography>
                                    <Typography sx={{textDecoration: 'underline',  m:2}}>Free WIFI & breakfast include</Typography>
                                    <FormControl sx={{mx: "auto", borderRadius: 2, m:5, }}><Button variant="contained" color="success" >Pay now</Button></FormControl>
                                </Grid>
                                


                            {/* <Grid item xs={12}>

                            </Grid> */}

                        </Grid>

                    </Box>
                </div>

                


            );
        } 

export default InsideRoom;