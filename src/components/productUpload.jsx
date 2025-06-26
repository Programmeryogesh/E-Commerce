import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material"; // Import the Close icon
import Upload from "../api/upload";
import { useParams, useNavigate } from "react-router-dom";
import GetProductById from "../api/getProductById";
import UpdateProducts from "../api/updateProduct";
import GetNotifications from "../api/notifications";
import { onMessageListener, requestNotificationPermission } from "../service/firebaseConfig";
import { triggerNotificationRefresh } from "../utils/notificationRefresh";

export default function ProductUpload() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [fcmToken, setFcmToken] = useState("");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
    previews: [],
    rating: { rate: "", count: "" },
  });

  useEffect(() => {
    if (productId) {
      GetProductById(productId).then((response) => {
        console.log(response.data, "check here");
        setProduct({
          title: response?.data?.product.title,
          description: response?.data?.product.description,
          price: response?.data?.product.price,
          category: response?.data?.product.category,
          images: response?.data?.product.image,
          previews: response?.data?.product.image,
          rating: {
            rate: response?.data?.product.rating.rate,
            count: response?.data?.product.rating.count,
          },
        });
      });
    }
  }, [productId]);
  useEffect(() => {
    requestNotificationPermission().then((token) => {
          if (token) {
            setFcmToken(token);
          }
        });
    onMessageListener().then((payload) => {
      console.log("Notification Received:", payload);
      alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rate" || name === "count") {
      setProduct((prev) => ({
        ...prev,
        rating: { ...prev.rating, [name]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const imagePreviews = files.map((file) => URL.createObjectURL(file));

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        previews: [...prev.previews, ...imagePreviews],
      }));
    }
  };

  // Function to remove an image
  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("rate", product.rating.rate);
    formData.append("count", product.rating.count);

    product.images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      const response = productId
        ? await UpdateProducts(productId, formData)
        : await Upload(formData);
      console.log(response);

      if (response.status === 200) {
        const userId = localStorage.getItem("userId");
        if (userId) {
          await GetNotifications(userId);
        }
        // Trigger notification refresh for navbar
        triggerNotificationRefresh();
        console.log("Product updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Upload Product</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              fullWidth
              label="Product Title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={product.description}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Rating (Rate)"
              name="rate"
              value={product.rating.rate}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Rating Count"
              name="count"
              value={product.rating.count}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />

            {/* Image Previews with Remove Button */}
            {product.previews.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {product.previews.map((preview, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {hoverIndex === index && (
                      <IconButton
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          backgroundColor: "rgba(255,255,255,0.8)",
                          borderRadius: "50%",
                          padding: "3px",
                          zIndex: 2,
                          transition: "opacity 0.2s ease-in-out",
                        }}
                      >
                        <Close fontSize="small" color="disabled" />
                      </IconButton>
                    )}
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <Button variant="contained" color="primary" type="submit">
              Upload
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
