import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import Validation from "./errors";
import login from "../api/login";
import { getMessaging } from "firebase/messaging";
import { onMessageListener } from "../service/firebaseConfig";
import { handleFCMTokenUpdate } from "../api/update-fcm-token";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="#0053ff" to="/login">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([]);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  const handleForegroundNotification = () => {
   onMessageListener().then((payload) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        payload.notification,
      ]);
    });
  };
  console.log(notifications , "notifications");
  
  React.useEffect(() => {
    
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payLoad = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = await login(payLoad);
    console.log(response, "response");
    
    
    if (response?.status === 200) {
      dispatch(setUser(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userId", response.data.user.id);
      setUserData(response.data);
      
      // Update FCM token after successful login
      await handleFCMTokenUpdate(response.data.user.id);
      
      navigate("/");
      handleForegroundNotification();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={userData.email}
                onChange={handleChange}
              />
              {errors.name && (
                <Typography sx={{ color: "red" }}>{errors.name}</Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <Typography sx={{ color: "red" }}>{errors.password}</Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    style={{ cursor: "pointer", color: "#0053ff" }}
                    to="/ForgotPassword"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{ cursor: "pointer", color: "#0053ff" }}
                    to={"/login/SignUp"}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
