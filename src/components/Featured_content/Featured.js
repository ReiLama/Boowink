import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, yellow } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HotelAtlantis from '../../Images/Hotel_Atlantis_Dubai.jpg';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import lufthansa from '../../Images/lufthansa.jpg';
import bengal from '../../Images/bengal.jpeg';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
  <Container maxWidth="md" sx={{display: "flex", marginTop: 15}}>
    <Card sx={{boxShadow: 3, paddingRight: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Atlantis Hotel"
        subheader="Dubai"
      />
      <CardMedia
        component="img"
        height="204"
        width="144"
        image={HotelAtlantis}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Atlantis The Palm, Dubai is a luxury hotel resort located at the apex of the Palm Jumeirah in the United Arab Emirates. It was the first resort to be built on the island and is themed on the myth of Atlantis but includes distinct Arabian elements.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            fontSize="large"
            sx={{ color: red[500] }}
          />
        </IconButton>
        <Button variant="contained" endIcon={<SendIcon />}>
            Book Now
        </Button>

      </CardActions>
    </Card>
    <Card sx={{boxShadow: 3, paddingRight: 2  }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Tirana to Milan"
        subheader="Direct Flight"
      />
      <CardMedia
        component="img"
        height="204"
        width="144"
        image={lufthansa}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Travel from Tirana International Airport to Milan Malpensa Airport with Lufthansa. Lufthansa offers flights from Tirana International Airport to Milan Malpensa Airport. The total flight duration from Tirana to Milan is 2 hours, 30 minutes. Traveling with a direct flight from Tirana
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            fontSize="large"
            sx={{ color: red[500] }}
          />
        </IconButton>
        <Button variant="contained" endIcon={<SendIcon />}>
            Book Now
        </Button>

      </CardActions>
    </Card>
    <Card sx={{ boxShadow: 3}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Bengal Village"
        subheader="London"
      />
      <CardMedia
        component="img"
        height="204"
        width="144"
        image={bengal}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        One of the best halal Indian restaurants in Brick Lane. We are committed to provide the best curry in Brick Lane to our customers. Pay us a visit and discover why were worth to choose. 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            fontSize="large"
            sx={{ color: red[500] }}
          />
        </IconButton>
        <Button variant="contained" endIcon={<SendIcon />}>
            Book Now
        </Button>
        
      </CardActions>
    </Card>
  </Container>
  );
}