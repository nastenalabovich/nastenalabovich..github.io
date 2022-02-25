import { Container, Row, Col, Card } from "react-bootstrap";
import useLanguage from "../hooks/Language";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

export default function PoetsList(props) {
    const { t, getCurrLang } = useLanguage();

    if (props.poets !== null && props.poets.length > 0) {
        let output = [];
        props.poets.forEach(poet => {
            output.push(
                <Col className="justify-content-center" md={4} key={uuid()}>
                    <Card className="mb-5" style={{ width: "230px", height: "450px" }} >
                        <Card.Img variant="top" style={{ height: "200px", objectFit: "cover", objectPosition: "left top" }} src={poet.photoUrl} />
                        <Card.Body>
                            <Card.Title>{poet.name[getCurrLang()]}</Card.Title>
                            <Card.Text>{poet.description[getCurrLang()]}</Card.Text>
                            <Link className="mt-auto btn btn-dark" to={"/poets/"+poet.id}>{t("landing.poetLink")}</Link>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });
        return (
            <>
                <Container fluid="md">
                    <Row>
                        {output}
                    </Row>
                </Container>
            </>
        );
    } else {
        return null;
    }
}