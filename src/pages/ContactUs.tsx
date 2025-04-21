import React, { useEffect, useState } from "react";
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
import { BookingForm, Email } from "../types";

const socialIcon = [
  { Icon: IconBrandFacebook, href: "https://www.facebook.com/ganeshdeodat2/" },
  {
    Icon: IconBrandInstagram,
    href: "https://www.instagram.com/limitlessmotorworksllc/",
  },
];
const ContactUs: React.FC<{ clientName: string }> = ({ clientName }) => {
  const [formData, setFormData] = useState<BookingForm>({
    email: "",
    firstName: "",
    lastName: "",
    description: "",
  });
  const [companyEmail, setCompanyEmail] = useState<Email>({
    recipientEmail: "felixliu789@gmail.com",
    subject: `ATTENTION: New message from contact form`,
    message: "",
  });

  useEffect(() => {
    setCompanyEmail({
      ...companyEmail,
      message: `Message from ${formData.firstName} ${formData.lastName} (${formData.email}): 
      \n${formData.description}`,
    });
  }, [formData]);

  const icons = socialIcon.map(({ Icon, href }, index) => (
    <Anchor key={index} href={href} target="_blank" rel="noopener noreferrer">
      <ActionIcon size={40} className={styles.socialIcon} variant="filled">
        <Icon size={40} stroke={1.5} />
      </ActionIcon>
    </Anchor>
  ));

  const isButtonDisabled: boolean =
    formData.email === "" ||
    formData.firstName === "" ||
    formData.lastName === "" ||
    formData.description === "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send email to company
      const response = await fetch("http://localhost:5005/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...companyEmail, clientName }),
      });
      const data = await response.json();
      console.log("Message sent to company:", data.message);
    } catch (error) {
      console.log("Error in sending email due to:", error);
    }
  };

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
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.currentTarget.value,
                  })
                }
                value={formData.email}
              />
              <TextInput
                label="First Name"
                required
                classNames={{ input: styles.input, label: styles.inputLabel }}
                mt="md"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    firstName: event.currentTarget.value,
                  })
                }
                value={formData.firstName}
              />
              <TextInput
                label="Last Name"
                required
                classNames={{ input: styles.input, label: styles.inputLabel }}
                mt="md"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    lastName: event.currentTarget.value,
                  })
                }
                value={formData.lastName}
              />
              <Textarea
                label="Message"
                required
                minRows={4}
                classNames={{ input: styles.input, label: styles.inputLabel }}
                mt="md"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.currentTarget.value,
                  })
                }
                value={formData.description}
              />
              <Group justify="flex-end" mt="md">
                <Button disabled={isButtonDisabled} onClick={handleSubmit}>
                  Send Message
                </Button>
              </Group>
            </div>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
