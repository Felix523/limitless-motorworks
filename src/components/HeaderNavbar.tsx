import React, { useState } from "react";
import {
  AppShell,
  Group,
  Burger,
  Image,
  NavLink,
  AppShellFooter,
  Text,
} from "@mantine/core";
import MotorWorks from "../assets/MotorWorks.png";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import {
  IconAddressBook,
  IconCalendarBolt,
  IconEngine,
  IconHome,
  // IconInfoCircle,
  // IconLogin,
} from "@tabler/icons-react";
import styles from "../styles/HeaderNavbar.module.css";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/appointments", label: "Appointments", icon: IconCalendarBolt },
  { link: "/contact", label: "Contact", icon: IconAddressBook },
  { link: "/autoparts", label: "Buy Parts", icon: IconEngine },
  // { link: '/about', label: 'About Us', icon: IconInfoCircle },
  // { link: '/login', label: 'Login', icon: IconLogin },
];

const HeaderNavbar = () => {
  const [opened, { toggle }] = useDisclosure();

  const links = data.map((item) => (
    <NavLink
      className={styles.link}
      key={item.label}
      label={
        <div className={styles.navLinkContent}>
          <item.icon className={styles.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </div>
      }
      to={item.link}
      component={Link}
    />
  ));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarMain}>
        <Group className={styles.header} justify="space-between">
          <Image src={MotorWorks} height={40} style={{ color: "white" }} />
        </Group>
        <div className={styles.links}>{links}</div>
      </div>
    </nav>
  );
};

export default HeaderNavbar;

// return (
//   <AppShell
//     header={{ height: 50 }}
//     navbar={{
//       width: { base: 240, sm: 200 },
//       breakpoint: "sm",
//     }}
//   >
//     <AppShell.Header>
//       <Group h="100%" px="md">
//         <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
//         <Image src={MotorWorks} height={30} alt="Limitless MotorWorks Logo" />
//         Limitless MotorWorks
//       </Group>
//     </AppShell.Header>
//     <AppShell.Navbar p="md">
//       <NavLink label="Home" to="/" component={Link} />
//       <NavLink label="Appointments" to="/appointments" component={Link} />
//       <NavLink label="Contact" to="/contact" component={Link} />
//       <NavLink label="Buy Parts" to="/autoparts" component={Link} />
//       {/* <NavLink label="About Us" to="/about" component={Link} /> */}
//       {/* <NavLink label="Login" to="/login" component={Link} /> */}
//     </AppShell.Navbar>
//     <AppShellFooter>
//       <Text ta="center">© 2025 Limitless MotorWorks LLC</Text>
//     </AppShellFooter>
//   </AppShell>
// );
