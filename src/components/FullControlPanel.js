import React from "react";
import { Box, Grid, Slider, Typography, useTheme } from "@mui/material";

const FullControlPanel = ({ controlValues, setControlValues, tvAttributes, setTvAttributes }) => {
  const theme = useTheme();

  // Map color names to supported formats
  const colorMap = {
    magenta: "#FF00FF",
    cyan: "#00FFFF",
    yellow: "#FFFF00",
  };

  const handleSliderChange = (attribute, value, type, tvColor = null) => {
    if (type === "control") {
      setControlValues((prevState) => ({
        ...prevState,
        [attribute]: value,
      }));
    } else if (type === "tv" && tvColor) {
      setTvAttributes((prevState) =>
        prevState.map((tv) =>
          tv.color === tvColor ? { ...tv, [attribute]: value } : tv
        )
      );
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        right: 16,
        transform: "translateY(-50%)",
        width: 500, // Adjust width for 3 TVs side by side
        padding: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1000,
        overflowY: "auto",
        maxHeight: "80%",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme.palette.primary.main }}
      >
        Control Panel
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
        Person Controls
      </Typography>
      {Object.keys(controlValues).map((key) => (
        <Box key={key} sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {controlValues[key]}
          </Typography>
          <Slider
            value={controlValues[key]}
            onChange={(e, newValue) => handleSliderChange(key, newValue, "control")}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
            sx={{
              color: theme.palette.secondary.main,
            }}
          />
        </Box>
      ))}

      <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
        TV Controls
      </Typography>
      <Grid container spacing={2}>
        {tvAttributes.map((tv) => (
          <Grid
            item
            xs={4} // Ensure TVs fit side by side
            key={tv.color}
          >
            <Box
              sx={{
                marginBottom: 2,
                padding: 2,
                borderRadius: 2,
                backgroundColor: colorMap[tv.color] || "#FFFFFF", // Fallback to white if color is unknown
                color:"#000000"
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {tv.color.charAt(0).toUpperCase() + tv.color.slice(1)}
              </Typography>

              <Typography variant="caption">Validity: {tv.validity}</Typography>
              <Slider
                value={tv.validity}
                onChange={(e, newValue) =>
                  handleSliderChange("validity", newValue, "tv", tv.color)
                }
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={1}
                sx={{
                  color: theme.palette.secondary.main,
                }}
              />

              <Typography variant="caption">Popularity: {tv.popularity}</Typography>
              <Slider
                value={tv.popularity}
                onChange={(e, newValue) =>
                  handleSliderChange("popularity", newValue, "tv", tv.color)
                }
                valueLabelDisplay="auto"
                min={1}
                max={100}
                step={1}
                sx={{
                  color: theme.palette.secondary.main,
                }}
              />

              <Typography variant="caption">Polarization: {tv.polarization}</Typography>
              <Slider
                value={tv.polarization}
                onChange={(e, newValue) =>
                  handleSliderChange("polarization", newValue, "tv", tv.color)
                }
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={1}
                sx={{
                  color: theme.palette.secondary.main,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FullControlPanel;
