import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ group, expanded, onExpandClick }) {
  const handleExpandClick = () => {
    onExpandClick && onExpandClick(); // Wywołaj funkcję onExpandClick przekazaną jako prop
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="Manage Group">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={group.groupName}
        subheader="September 14, 2023"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Group budget: {group.groupBudget}zł
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton ria-label="Remove Group">
          <DeleteForeverIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Members of group: 4</Typography>
          <Typography paragraph>jakieś pierdoły</Typography>
          <Typography paragraph>coś o grupie, członkach</Typography>
          <IconButton aria-label="Show more members">
            <Typography>...More</Typography>
          </IconButton>
        </CardContent>
      </Collapse>
    </Card>
  );
}
