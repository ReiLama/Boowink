import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
// import Grid from '@mui/material/Grid';
import { Box, Grid } from '@mui/material';
import "./List.css";


function List() {
        const imageData = [
            { 
              label: "Image 1",
              alt: "image1",
              url:"https://www.hotel-europapark.com/uploads/tx_tiranacontent/Location_thumbnail.jpg"
            },
            {
              label: "Image 2",
              alt: "image2",
              url:"https://internationaltravelandtours.com/wp-content/uploads/2018/11/rogner-hotel-tirana-14.jpg"
            },
            {
              label: "Image 3",
              alt: "image3",
              url:"https://www.il.kayak.com/rimg/himg/2e/98/ea/ice-53448-79534344_3XL-431847.jpg?width=720&height=576&crop=true"
            },
            {
              label: "Image 4",
              alt: "image4",
              url:"https://q-xx.bstatic.com/xdata/images/hotel/max500/262050932.jpg?k=3ba04fe8ea13f1ab7ce6126594a441742682a957f2471db001b2d298ad345216&o="
            },
            {
                label: "Image 5",
                alt: "image4",
                url:"https://www.hotel-europapark.com/uploads/tx_tiranacontent/Restaurant_apollonia_thumbnail.jpg"
            },
            {
                label: "Image 6",
                alt: "image4",
                url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiz3TZEeZSvILvK26R65K5H43XBOGaaTwfMQ&usqp=CAU"
            },
            {
                label: "Image 7",
                alt: "image4",
                url:"https://www.kayak.com/rimg/himg/a3/f3/31/expediav2-9739-164241812-326910.jpg?width=1366&height=768&crop=true"
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
                        <Box sx={{
                            mx:'auto',
                            mt:4,
                            width: '90%',
                        }}>
                           <Grid container spacing={3}>

                            <Grid item xs={6}> 
                                <div className="container-1">
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
                                </div>
                             </Grid>

                            <Grid item xs={6}> 
                                <p>provaaaaa</p></Grid>

                            </Grid>
                            
                        </Box>


                  </div>
            );
        } 

export default List;