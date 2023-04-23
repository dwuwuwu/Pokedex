import NavBar from "./NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function About() {
  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={6} className="bg-primary text-white p-4 rounded-3">
            <h1 className="text-center mb-4">Gotta catch 'em all!</h1>
            <p className="text-center mb-0">Pokemon are the best</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
