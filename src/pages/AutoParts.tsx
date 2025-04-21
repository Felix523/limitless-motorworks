import { Anchor, Center, Text, Title } from "@mantine/core";
import React from "react";
import HeaderNavbar from "../components/HeaderNavbar";

const AutoParts = () => {
  return (
    <div style={{ display: "flex" }}>
      <HeaderNavbar />
      <div style={{ marginLeft: "6%", width: "100%" }}>
        <Title ta="center" pt={50} pb={10}>
          Limitless AutoParts
        </Title>
        <Text ta="center">
          If you are interested in buying parts for your car
        </Text>
        <Text ta="center">
          You can check out Limitless AutoParts on ebay to see what we have in
          stock
        </Text>
        <Text ta="center">
          We have a wide variety of quality parts that meet or exceeds OEM for
          all makes and models
        </Text>
        <Center>
          <Anchor ta="center" href="https://ebay.com" target="_blank">
            CHECK OUT OUR EBAY STORE
          </Anchor>
        </Center>
      </div>
    </div>
  );
};
export default AutoParts;
