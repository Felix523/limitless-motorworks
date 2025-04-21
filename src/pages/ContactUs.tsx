import React from "react";
import HeaderNavbar from "../components/HeaderNavbar";
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

import { ContactIconsList } from "../components/ContactInformation";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import styles from "../styles/ContactUs.module.css";

const socialIcon = [
  { Icon: IconBrandFacebook, href: "https://www.facebook.com/ganeshdeodat2/" },
  {
    Icon: IconBrandInstagram,
    href: "https://www.instagram.com/limitlessmotorworksllc/",
  },
];
const ContactUs = () => {
  const icons = socialIcon.map(({ Icon, href }, index) => (
    <Anchor key={index} href={href} target="_blank" rel="noopener noreferrer">
      <ActionIcon size={40} className={styles.socialIcon} variant="filled">
        <Icon size={40} stroke={1.5} />
      </ActionIcon>
    </Anchor>
  ));
  return (
    <div style={{ display: "flex" }}>
      <HeaderNavbar />
      <div style={{ marginLeft: "6%", width: "100%" }}>
        <div className={styles.wrapper}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            <div>
              <Title className={styles.title} mb={20}>
                Contact Us
              </Title>
              <ContactIconsList />
              <Text className={styles.description} mt={20} ml={40}>
                Find us on:
              </Text>
              <Group mt="sm" ml={30}>
                {icons}
              </Group>
            </div>
            <div className={styles.form}>
              <TextInput
                label="Email"
                required
                classNames={{ input: styles.input, label: styles.inputLabel }}
                mt="md"
              />
              <TextInput
                label="Name"
                required
                classNames={{ input: styles.input, label: styles.inputLabel }}
                mt="md"
              />
              <Textarea
                label="Message"
                required
                minRows={4}
                classNames={{ input: styles.input, label: styles.inputLabel }}
                mt="md"
              />
              <Group justify="flex-end" mt="md">
                <Button className={styles.control}>Send Message</Button>
              </Group>
            </div>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;