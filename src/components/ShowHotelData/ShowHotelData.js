import React from "react";
import Axios from "axios";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Route, useNavigate } from "react-router-dom";

const ShowHotelData = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  Axios.get("./hotels.json")
    .then((res) => {
      setHotels(res.data.hotels);
      console.log(hotels);
    })
    .catch((err) => console.log(err));
  return (
    <div className="hotel-results">
      {hotels.map((hotel) => {
        return (
          <div className="data-hotel-result" key={hotel.hotel_id}>
            <Card
              sx={{
                maxWidth: 345,
                m: "30px",
                border: 1,
                boxshadow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/hotel-details/${hotel.hotel_id}`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={hotel.hotel_photos[0].url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.hotel_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.location}, {hotel.city}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="black"
                    sx={{
                      mt: 2,
                    }}
                  >
                    {hotel.price_per_night}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  sx={{
                    marginLeft: "33%",
                  }}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ShowHotelData;
