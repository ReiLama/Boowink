import * as React from 'react';
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
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
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
  );
}