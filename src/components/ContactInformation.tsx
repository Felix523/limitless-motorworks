import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";
import { Box, Stack, Text } from "@mantine/core";
import classes from "../styles/ContactInformation.module.css";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  value: React.ReactNode;
  label: React.ReactNode;
}

const ContactIcon = ({
  icon: Icon,
  value,
  label,
  ...others
}: ContactIconProps) => {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {value}
        </Text>
        <Text className={classes.description}>{label}</Text>
      </div>
    </div>
  );
};

export const CONTACT_INFORMATION = [
  { value: "Email", label: "Ganeshdeodat2@gmail.com", icon: IconAt },
  {
    value: "Address",
    label: (
      <>
        134 Lincoln Ave building 302 <br />
        Colonie, NY 12205
      </>
    ),
    icon: IconMapPin,
  },
  { value: "Phone", label: "(518) 250-4468", icon: IconPhone },
  {
    value: "Hours",
    label: (
      <>
        Monday - Friday: 8:00 AM - 6:00 PM
        <br />
        Saturday: 9:00 AM - 3:00 PM
        <br />
        Sunday: CLOSED
      </>
    ),
    icon: IconSun,
  },
];

export const ContactIconsList = () => {
  const items = CONTACT_INFORMATION.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
};
