import { Box, Typography, Link, Stack, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

const Footer = () => {
  return (
    <Box component="footer">
      <Box
        sx={{
          backgroundColor: "#fff",
          color: "#282c34",
          padding: "80px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Typography
            variant="overline"
            sx={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            HEARD <br /> ENOUGH? →
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: 80,
              fontWeight: 600,
              letterSpacing: "-2px",
              margin: 0,
              borderBottom: "4px solid #9c27b0",
              lineHeight: 1,
              color: "#282c34",
            }}
          >
            Contact us
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#9c27b0",
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 30, color: "#fff" }} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "60px 40px",
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              sx={{
                fontSize: "2.2rem",
                fontWeight: 700,
                lineHeight: 1,
                maxWidth: "250px",
              }}
            >
              The agency for impatient brands®
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: "#888" }}>
              Egypt
            </Typography>
            <Link
              href="mailto:newbusiness@weareimpero.com"
              sx={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "block",
                mb: 0.5,
                "&:hover": { opacity: 0.7 },
              }}
            >
              newbusiness@weareimpero.com
            </Link>
            <Typography sx={{ fontSize: "0.9rem", mb: 0.5 }}>
              +2012 079 9875
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#ccc" }}>
              Unit 306, Metropolitan Wharf,
              <br />
              70 Wapping Wall, London E1W 3SS
            </Typography>
            <Link
              href="#"
              sx={{
                color: "#fff",
                textDecoration: "underline",
                fontWeight: 600,
                mt: 2,
                display: "block",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "1px",
              }}
            >
              SEE ON MAP ↗
            </Link>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: "#888" }}>
              BUENOS AIRES
            </Typography>
            <Link
              href="mailto:buenosaires@weareimpero.com"
              sx={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "block",
                mb: 0.5,
                "&:hover": { opacity: 0.7 },
              }}
            >
              buenosaires@weareimpero.com
            </Link>
            <Typography sx={{ fontSize: "0.9rem", mb: 0.5 }}>
              +2012 079 9875
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#ccc" }}>
              Cabildo 1458 1st floor,
              <br />
              Buenos Aires
            </Typography>
            <Link
              href="#"
              sx={{
                color: "#fff",
                textDecoration: "underline",
                fontWeight: 600,
                mt: 2,
                display: "block",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "1px",
              }}
            >
              SEE ON MAP ↗
            </Link>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "#888" }}>
              WANT TO BE THE SMARTEST IN YOUR OFFICE?
            </Typography>
            <Typography
              sx={{
                borderBottom: "1px solid #fff",
                pb: "5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-block",
                width: "100%",
                "&:hover": { color: "#9c27b0", borderColor: "#9c27b0" },
              }}
            >
              SIGN UP FOR OUR NEWSLETTER →
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "#888" }}>
                FOLLOW US
              </Typography>
              <Stack direction="row" spacing={3}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": { color: "#9c27b0" },
                  }}
                >
                  Bē
                </Typography>
                <LanguageIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    "&:hover": { color: "#9c27b0" },
                  }}
                />
                <InstagramIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    "&:hover": { color: "#9c27b0" },
                  }}
                />
                <LinkedInIcon
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    "&:hover": { color: "#9c27b0" },
                  }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign={"center"} >
        <Typography color="#fff" borderTop={1} p={1}>
          Created By: "Eng: Mohamed Amr"
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
