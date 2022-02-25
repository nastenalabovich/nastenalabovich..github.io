import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLanguage from "../hooks/Language";
import useJsonDB from "../hooks/JsonDB";

export default function PoetOfTheDay(props) {

    const { t, getCurrLang } = useLanguage();

    const [poet, setPoet] = useState(null);

    const [dbLoaded, dbSearchPoet] = useJsonDB("poetsShort.json");

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        if (dbLoaded) {
            let allPoets = dbSearchPoet("", "");
            let randomIndex = getRandomInt(allPoets.length);
            setPoet(allPoets[randomIndex]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbLoaded]);


    return (
        <Container id={props.id} style={props.style} fluid className="d-flex flex-column justify-content-center align-items-center">
            {
                dbLoaded === true && poet !== null ? (
                    <>
                    <h3>{t("landing.poetOfTheDay")}</h3>
                    <Card className="text-center" style={{ width: '18rem' }} bg={"light"}>
                        <Card.Img variant="top" src={poet.photoUrl} />
                        <Card.Body>
                            <Card.Title>{poet.name[getCurrLang()]}</Card.Title>
                            <Card.Subtitle className="font-style: italic">{poet.dob} - {poet.dod}</Card.Subtitle>
                            <Card.Text>
                                {poet.description[getCurrLang()]}
                            </Card.Text>
                            <Link className="btn btn-dark" to={"/poets/" + poet.id}>{t("landing.poetLink")}</Link>
                        </Card.Body>
                    </Card>
                    </>
                ) : (
                    <span>Loading</span>
                )
            }

        </Container >
    );
}