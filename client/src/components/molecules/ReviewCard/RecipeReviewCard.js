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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleExpandClick = () => {
    onExpandClick && onExpandClick(); // Wywołaj funkcję onExpandClick przekazaną jako prop
  };

  function handleManageGroupClick(group) {
    console.log(group);
    console.log(`kliknięto grupe o id: ${group.group_id}`);
    const groupDetailsObject = {
      group_name: group.group_name,
      group_id: group.group_id,
      created_date: group.created_date,
    };

    navigate("/GroupDetails", { state: { groupDetailsObject } });
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 3,
        boxShadow: "6px 6px 6px 6px rgba(13, 71, 161, 0.5)",
        backdropFilter: "blur(5px)",
        background:
          "linear-gradient(to right top, rgba(200, 200, 200, 0.15), rgba(200, 200, 200, 0.15))",
      }}
    >
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
        title={group.group_name}
        subheader={new Date(group.created_date).toLocaleString()}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Group budget: {group.group_budget} zł
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
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
          <Typography paragraph>
            Members of group: {group.members.length}
          </Typography>
          <Typography paragraph>
            Group Owner: {group.members[0].name}, {group.members[0].email}
          </Typography>

          {/* <Typography paragraph>Expense list:</Typography> */}

          <IconButton
            aria-label="Show more."
            onClick={() => handleManageGroupClick(group)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <MoreVertIcon />
            <Typography style={{ marginLeft: "5px" }}>More</Typography>
          </IconButton>
        </CardContent>
      </Collapse>
    </Card>
  );
}
