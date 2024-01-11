import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

export default function RecipeReviewCard({ group, expanded, onExpandClick }) {
  const navigate = useNavigate();

  function handleManageGroupClick(group) {
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
        maxWidth: 420,
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
            {group.group_name[0]}
          </Avatar>
        }
        action={
          <Tooltip title="Group details">
            <IconButton
              aria-label="Manage Group"
              onClick={() => handleManageGroupClick(group)}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={group.group_name}
        subheader={new Date(group.created_date).toLocaleString()}
      />

      <CardContent>
        <Typography variant="body3" color="text.secondary">
          Group budget: {group.group_budget} zł
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Members of group: {group.members.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Group Owner: {group.members[0].name}, {group.members[0].email}
        </Typography>
      </CardContent>
    </Card>
  );
}
