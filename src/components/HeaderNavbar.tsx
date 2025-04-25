import { Anchor, Burger, Container, Drawer, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MotorWorks from "../assets/MotorWorks.png";
import styles from "../styles/HeaderNavbar.module.css";
import { Link } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/appointments", label: "Appointments" },
  { link: "/autoparts", label: "Buy Parts" },
  { link: "/contact", label: "Contact" },
  // { link: '/about', label: 'About Us'},
  // { link: '/login', label: 'Login'},
];

const HeaderNavbar = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={styles.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={styles.header}>
      <Container size="md" className={styles.inner}>
        <Anchor component={Link} to="/" className={styles.logo}>
          <Image src={MotorWorks} alt="MotorWorks Logo" h={50} />
        </Anchor>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        <Drawer
          opened={opened}
          onClose={toggle}
          title="Menu"
          padding="md"
          size="sm"
        >
          {items}
        </Drawer>
      </Container>
    </header>
  );
};

export default HeaderNavbar;
