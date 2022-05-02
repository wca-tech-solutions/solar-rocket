import { Container } from "@mui/material";
import WeatherRoot from "../components/WeatherRoot";
import { AppLayout } from "../layouts/AppLayout";

const Weather = (): JSX.Element => {
  return (
    <AppLayout title="Weather">
      <Container maxWidth="lg">
        <WeatherRoot />
      </Container>
    </AppLayout>
  );
};

export { Weather };
