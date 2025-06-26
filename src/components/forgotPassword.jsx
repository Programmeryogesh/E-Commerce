import { useState } from "react";
import { TextField, Button, Card, CardContent, Alert, Typography } from "@mui/material";
import ForgotPasswordApi from "../api/forgot-password";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await ForgotPasswordApi({ email });
      setMessage(response.data.message);
      setIsDisabled(true);
      setTimer(120); // Start 2-minute (120 seconds) cooldown
      
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Forgot Password</Typography>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-4" style={{ display: "flex", flexDirection: "column", gap: "10px" , marginTop: "20px"}}>
            <TextField
              fullWidth
              label="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isDisabled}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading || isDisabled}
              fullWidth
            >
              {isDisabled ? `Wait ${timer}s` : loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}