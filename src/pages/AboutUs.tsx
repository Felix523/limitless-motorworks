import React from "react";
import { Title, Text } from "@mantine/core";
import HeaderNavbar from "../components/HeaderNavbar";

const AboutUs = () => {
  return (
    <div style={{ display: "flex" }}>
      <HeaderNavbar />
      <div style={{ marginLeft: "6%", width: "100%" }}>
        <Title pt={50} ta="center">
          Meet the Team
        </Title>
        <Text ta="center">Ganesh</Text>
        <Text ta="center">See what others have to say</Text>
        <Text ta="center">Google Reviews</Text>
      </div>
    </div>
  );
};

export default AboutUs;
