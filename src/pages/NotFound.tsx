import React from "react";
import { Container, Title, Group, Button, Text } from "@mantine/core";
import NotFoundIllustration from '../components/NotFoundIllustration';
import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from '../styles/NotFound.module.css';


const NotFound: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const goToHome = (): void => {
        navigate("/");
    };

    return (
        <Container className={styles.root}>
          <div className={styles.inner}>
            <NotFoundIllustration className={styles.image} />
            <div className={styles.content}>
              <Title className={styles.title}>Nothing to see here</Title>
              <Text c="dimmed" size="lg" ta="center" className={styles.description}>
                The page you are trying to open does not exist. You may have mistyped the URL, or the
                page has been moved to another URL. If you think this is an error contact support.
              </Text>
              <Group justify="center">
                <Button size="md" radius="md" onClick={goToHome}>Take me back to home page</Button>
              </Group>
            </div>
          </div>
        </Container>
      );
}
export default NotFound;