import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FullScreenDialog from "./FullScreenDialog";
import { useEffect } from "react";
import GetNotifications from "../api/notifications";
import { setSearchQuery } from "../store/actions/productActions";
import getProfile from "../api/profile";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavigationBar() {
  const cartItems = useSelector((state) => state.cart.products);
  const userStatus = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = React.useState("");
  const [profilePhoto, setProfilePhoto] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState("");

  // console.log(userStatus);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.clear();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const getData = async () => {
    const userId = localStorage.getItem("userId");
    const response = await GetNotifications(userId);
    console.log(response);

    if (response?.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    // Fetch profile photo if logged in
    const userId = localStorage.getItem("userId");
    if (userId) {
      getProfile(userId).then((response) => {
        if (response && response.status === 200 && response.data.profilePhoto) {
          setProfilePhoto(`http://localhost:5000${response.data.profilePhoto}`);
        } else {
          setProfilePhoto(null);
        }
      });
    } else {
      setProfilePhoto(null);
    }
  }, []);
  

  useEffect(() => {
    if (userId) {
      console.log(userId, "userId");
      getData();
    }
  }, [userId]);

  // Listen for profile photo change event (simulate via localStorage or event)
  useEffect(() => {
    // Listen for a custom event 'profilePhotoChanged'
    const handler = (e) => {
      if (e.detail && e.detail.success) {
        setSnackbarMsg("Profile photo updated successfully!");
        setSnackbarOpen(true);
        // Optionally, refresh the profile photo
        const userId = localStorage.getItem("userId");
        if (userId) {
          getProfile(userId).then((response) => {
            if (response && response.status === 200 && response.data.profilePhoto) {
              setProfilePhoto(`http://localhost:5000${response.data.profilePhoto}`);
            }
          });
        }
      }
    };
    window.addEventListener('profilePhotoChanged', handler);
    return () => window.removeEventListener('profilePhotoChanged', handler);
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to={"/MyAccount"}>
        My account
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={data.length || 0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem component={Link} to={"/Cart"}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>ShoppingCart</p>
      </MenuItem>

      {userStatus.user == null ? (
        <Button
          variant="contained"
          color="warning"
          component={Link}
          to={"/login"}
        >
          Login/SignUp
        </Button>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
    </Menu>
  );

  const handleSearch = () => {
    dispatch(setSearchQuery(searchInput));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              display: {
                xs: "none",
                sm: "block",
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              },
            }}
          >
            E-Commerce
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleClickOpen}
            >
              <Badge badgeContent={data.length || 0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              component={Link}
              to={"/Cart"}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {localStorage.getItem("token") ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            ) : (
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                color="success"
                component={Link}
                to={"/login"}
              >
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {localStorage.getItem("role") === "seller" ||
          localStorage.getItem("role") === "admin" ? (
            <Button
              sx={{ marginLeft: "20px" }}
              variant="contained"
              color="warning"
              component={Link}
              to={"/upload_product"}
            >
              Upload Product
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <FullScreenDialog open={open} setOpen={setOpen} data={data} onRefresh={getData} />
    
    </Box>
  );
}
