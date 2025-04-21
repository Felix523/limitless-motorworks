import React, { JSX } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Button,
  Grid,
  Card,
  Center,
} from "@mantine/core";
import HeaderNavbar from "../components/HeaderNavbar";

const Home = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const goToAppointments = (): void => {
    navigate("/appointments");
  };

  return (
    <div style={{ display: "flex" }}>
      <HeaderNavbar />
      <div style={{ marginLeft: "6%", width: "100%" }}>
        <Container size="lg" py={10} pt={50} ta="center">
          <Text size="lg" c="dimmed" mb={30} pb={30}>
            Quality Repairs and maintenance for your vehicle.
          </Text>
          <Grid gutter={30}>
            <Grid.Col mb={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={3}>Experience You Can Trust</Title>
                <Title order={3}>Quality You Can Rely On</Title>
                <Text size="sm" c="dimmed" mt={10}>
                  Our expert technicians are here to help you with all your
                  vehicle needs.
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
        <Center>
          <Button
            variant="filled"
            size="lg"
            radius="md"
            onClick={goToAppointments}
          >
            Schedule An Appointment With Us
          </Button>
        </Center>

        <Title pt={50} ta="center">
          Meet the Team
        </Title>
        <Text ta="center">Ganesh</Text>
        <Text ta="center">See what others are saying about us:</Text>
        <Text ta="center">Google Reviews</Text>
      </div>
    </div>
  );
};

export default Home;
