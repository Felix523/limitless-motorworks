import { Text, Title } from "@mantine/core";
import React, { JSX } from "react";
import HeaderNavbar from "../components/HeaderNavbar";
import { Location, useLocation } from "react-router-dom";

const Confirmation = (): JSX.Element => {
  const location: Location = useLocation();
  const { confirmationNumber } = location.state || {};
  return (
    <div style={{ display: "flex" }}>
      <HeaderNavbar />
      <div style={{ marginLeft: "6%", width: "100%" }}>
        <Title ta="center" pt={50}>
          Confirmation #{confirmationNumber}
        </Title>
        <Text ta="center">
          Thank you for scheduling an appointment with us!
        </Text>
      </div>
    </div>
  );
};

export default Confirmation;
