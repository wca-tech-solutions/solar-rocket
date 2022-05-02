
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const WeatherRoot = (): JSX.Element => {
    const [weather, setWeather] = useState<any | null>(null);
    const [selectedForecast, setSelectedForecast] = useState<any | null>(null);

    const forecast = async () => {
        const res = await fetch("https://api.weatherapi.com/v1/forecast.json?key=4d4e815ecb5a43d0b7f135757223004&q=auto:ip&days=5&aqi=no&alerts=no", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.status === 200) {
            const data = await res.json();
            setWeather(data)
        }
    }

    useEffect(() => {
        // fetch weather data from api
        forecast();
    }, [])

    useEffect((): void => {
        if (weather) {
            setSelectedForecast(weather.forecast.forecastday[0]);
        }
    }, [weather])

    return (
        <>
            <Typography variant="h4" component="h1"
                sx={{
                    marginBottom: "1rem"
                }}
            >
                Weather
            </Typography>

            {
                (!!weather && selectedForecast)
                    ? <Paper
                        elevation={3}
                        sx={{
                            borderRadius: 5,
                            backgroundColor: "#21262f",
                            color: "white",

                            // borderEndEndRadius: 0,
                            // borderTopRightRadius: 0,
                        }}>
                        <Grid container sx={{

                        }}>
                            <Grid item xs={4} >
                                <Card sx={{
                                    borderRadius: 5,
                                    height: "100%",
                                }}>
                                    <Grid container direction="column"
                                        sx={{
                                            paddingX: 2,
                                            paddingY: 1,
                                        }}>
                                        <Typography variant="caption"
                                        >{moment(weather.current.last_updated).format('llll')}</Typography>

                                        <Typography variant="h4"
                                        >{weather.current.temp_c}°C</Typography>
                                    </Grid>
                                    <CardMedia
                                        sx={{
                                            width: "80%",
                                            margin: "auto",
                                        }}
                                        component="img"
                                        image={weather?.current?.condition?.icon}
                                    />

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {weather.current.condition.text}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {weather?.location?.name} {weather?.location?.region} {weather?.location?.country}
                                        </Typography>
                                    </CardContent>
                                </Card>

                            </Grid>
                            <Grid item xs={8} container
                                sx={{
                                    paddingY: 1,
                                    paddingX: 2,
                                }}>
                                <>
                                    <Grid item container justifyContent="space-between" alignItems="center">

                                        <Typography variant="button" gutterBottom>
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            {selectedForecast.day.daily_chance_of_rain}% Chance of Rain
                                        </Typography>
                                    </Grid>
                                    <Grid item container justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" gutterBottom>
                                            {selectedForecast.day.condition.text}
                                        </Typography>
                                        <Avatar
                                            sx={{ width: 50 }}
                                            src={selectedForecast.day.condition.icon}
                                        />
                                    </Grid>


                                    <Grid item container justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom>
                                            Average Humidity
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {selectedForecast.day.avghumidity}%
                                        </Typography>
                                    </Grid>

                                    <Grid item container justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom>
                                            Wind
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {selectedForecast.day.avghumidity}% kph
                                        </Typography>
                                    </Grid>

                                    <Grid item container justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom>
                                            UV Index
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {selectedForecast.day.uv}
                                        </Typography>
                                    </Grid>
                                    <Grid item container justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom>
                                            Maximum Temperature
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {selectedForecast.day.maxtemp_c}°C
                                        </Typography>
                                    </Grid>
                                    <Grid item container justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom>
                                            Minimum Temperature
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {selectedForecast.day.mintemp_c}°C

                                        </Typography>
                                    </Grid>
                                    <Grid item container justifyContent="space-between">
                                        <Typography variant="body2" gutterBottom>
                                            Moon Phase
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {selectedForecast.astro.moon_phase}

                                        </Typography>
                                    </Grid>
                                </>
                                <Grid item container sx={{
                                    backgroundColor: '#222831',
                                    minHeight: 100,
                                    width: '100%',
                                    borderRadius: 2,
                                }}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        sx={{
                                            borderRadius: 2
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => setSelectedForecast(weather.forecast.forecastday[0])}
                                            sx={{
                                                borderRadius: 2,
                                                padding: 2
                                            }}>
                                            <Avatar
                                                sx={{
                                                    width: 50,
                                                }}
                                                src={weather?.forecast.forecastday[0].day.condition.icon}
                                            ></Avatar>
                                            <Typography>{weather?.forecast.forecastday[0].day.avgtemp_c}°C</Typography>
                                            <Typography variant="caption">{moment(weather?.forecast.forecastday[0].date).format('ll')}</Typography>
                                        </CardActionArea>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => setSelectedForecast(weather.forecast.forecastday[1])}
                                            sx={{
                                                borderRadius: 2,
                                                padding: 2,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 50,
                                                }}
                                                src={weather?.forecast.forecastday[1].day.condition.icon}
                                            ></Avatar>
                                            <Typography>{weather?.forecast.forecastday[1].day.avgtemp_c}°C</Typography>
                                            <Typography variant="caption">{moment(weather?.forecast.forecastday[1].date).format('ll')}</Typography>
                                        </CardActionArea>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => setSelectedForecast(weather.forecast.forecastday[2])}
                                            sx={{
                                                borderRadius: 2,
                                                padding: 2,
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 50,
                                                }}
                                                src={weather?.forecast.forecastday[2].day.condition.icon}
                                            ></Avatar>
                                            <Typography>{weather?.forecast.forecastday[2].day.avgtemp_c}°C</Typography>
                                            <Typography variant="caption">{moment(weather?.forecast.forecastday[2].date).format('ll')}</Typography>

                                        </CardActionArea>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>


                    </Paper>
                    : <Box sx={{ textAlign: "center" }}>
                        <CircularProgress />
                    </Box>
            }
        </>
    );
}

export default WeatherRoot;

