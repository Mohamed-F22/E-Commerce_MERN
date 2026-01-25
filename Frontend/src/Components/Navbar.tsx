import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../Context/Auth/AuthContext";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../Context/Cart/CartContext";

function Navbar() {
  const { cartItems } = useCart();
  const { userName, isAuthenticated, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyOrders = () => {
    navigate("/myorders");
    handleCloseUserMenu();
  };

  const handleLogin = () => {
    const loginForm = document.getElementById("login-form");
    loginForm?.classList.add("active-login");
    const overlay = document.getElementById("overlay");
    overlay?.classList.add("overlay-active");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };

  const handleCart = () => {
    const cart = document.getElementById("cart");
    if (cart?.classList.contains("active-cart")) {
      cart.classList.remove("active-cart");
    } else cart?.classList.add("active-cart");

    const overlay = document.getElementById("overlay");
    if (overlay?.classList.contains("overlay-active")) {
      overlay.classList.remove("overlay-active");
    } else overlay?.classList.add("overlay-active");
  };
  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <AppBar sx={{ zIndex: 1 }} position="fixed" className="bg-third">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={handleGoToHome}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <AdbIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: "0.3rem",
                  }}
                >
                  Tech Hub
                </Typography>
              </Box>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                flexGrow: 0,
                alignItems: "center",
              }}
            >
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                    >
                      <Grid>
                        <Typography>{userName}</Typography>
                      </Grid>
                      <Grid>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={userName || ""}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleMyOrders}>
                      <Typography sx={{ textAlign: "center" }}>
                        Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                  <IconButton aria-label="cart" onClick={handleCart}>
                    <Badge badgeContent={cartItems.length} color="secondary">
                      <ShoppingCartIcon sx={{ color: "#fff" }} />
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
