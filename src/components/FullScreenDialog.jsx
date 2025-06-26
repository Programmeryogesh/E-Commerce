import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Slide from "@mui/material/Slide";
import { deleteNotification, deleteAllNotifications } from "../api/notifications";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, data, onRefresh }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleDeleteNotification = async (index) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const response = await deleteNotification(userId, index);
      if (response && response.status === 200) {
        // Refresh notifications after successful deletion
        if (onRefresh) {
          onRefresh();
        }
      } else {
        alert("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Error deleting notification");
    }
  };

  const handleDeleteAllNotifications = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete all notifications?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteAllNotifications(userId);
      if (response && response.status === 200) {
        // Refresh notifications after successful deletion
        if (onRefresh) {
          onRefresh();
        }
      } else {
        alert("Failed to delete all notifications");
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      alert("Error deleting all notifications");
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textAlign: "end" }}
              variant="h6"
              component="div"
            >
              Notifications
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleRefresh}
              aria-label="refresh"
            >
              <RefreshIcon />
            </IconButton>
            {data.length > 0 && (
              <IconButton
                color="inherit"
                onClick={handleDeleteAllNotifications}
                aria-label="delete all"
                title="Delete All Notifications"
              >
                <DeleteSweepIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <List>
          {data.length > 0 &&
            data.map((item, index) => {
              const createdAt = new Date(item.createdAt);
              return (
                <React.Fragment key={index}>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={item.message}
                      secondary={createdAt.toLocaleString()}
                    />
                    <IconButton
                      onClick={() => handleDeleteNotification(index)}
                      aria-label="delete"
                      color="error"
                      size="small"
                      title="Delete Notification"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                  <Divider />
                </React.Fragment>
              );
            })}

          {data.length < 1 && <h1>No notifications</h1>}
        </List>
      </Dialog>
    </React.Fragment>
  );
}
