import { Html, Body, Container, Text, Preview } from '@react-email/components';

interface Props {
  date: string;
  time: string;
  service: string;
  serviceOption: string;
}

const ConfirmationTemplate = ({
  date,
  time,
  service,
  serviceOption,
}: Props) => {
  return (
    <Html>
      <Preview>Your booking is confirmed!</Preview>
      <Body>
        <Container>
          <Text>Thank You!</Text>
          <Text>
            Your booking with Lashes Studio by Boochita is now confirmed.
          </Text>
          <Text>Booking Details:</Text>
          <Text>Date: {date}</Text>
          <Text>Time: {time}</Text>
          <Text>Service: {service}</Text>
          <Text>Service option: {serviceOption}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationTemplate;
