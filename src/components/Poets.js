import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link } from "react-router-dom";
import { Navbar, Nav, Container, InputGroup, FormControl } from "react-bootstrap";
import useLanguage from "../hooks/Language";
import useJsonDB from "../hooks/JsonDB";
import PoetsList from "./PoetsList";
import { DropdownLanguage } from "./Home";
import { HashLink } from "react-router-hash-link";
import PoetInfo from "./PoetInfo";

function Poets() {
    const { t, getCurrLang } = useLanguage();
    const { id } = useParams();

    const [dbLoaded, dbSearchPoet] = useJsonDB("poetsShort.json");
    const [searchResult, setSearchResult] = useState(null);

    const [query, setQuery] = useState("");
    useEffect(() => {
        if (dbLoaded === true) {
            setSearchResult(dbSearchPoet("name." + getCurrLang(), query));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dbLoaded, query]);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" className="mb-5" variant="dark">
                <Container fluid="md">
                    <Link className="navbar-brand" to="/">Belarusian Poets</Link> {/* TODO fix link*/}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {
                                id === undefined ? (
                                    <InputGroup className="mr-4">
                                        <FormControl
                                            value={query}
                                            onChange={e => setQuery(e.target.value)}
                                            placeholder={t("poets.search")} />
                                    </InputGroup>
                                ) : (
                                    <>
                                        <HashLink className="nav-link" smooth to="#photos">{t("poets.photos")}</HashLink>
                                        <HashLink className="nav-link" smooth to="#bio">{t("poets.bio")}</HashLink>
                                        <HashLink className="nav-link" smooth to="#video">{t("poets.video")}</HashLink>
                                        <HashLink className="nav-link" smooth to="#map">{t("poets.map")}</HashLink>
                                        <Link className="nav-link" to="/poets">{t("navbar.poets")}</Link>
                                    </>
                                )
                            }
                            <DropdownLanguage />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                {
                    id === undefined ? dbLoaded === false ?
                        (
                            <h1>Loading...</h1>
                        ) :
                        (
                            <PoetsList poets={searchResult} />
                        ) :
                        (
                            <PoetInfo id={id} />
                        )
                }
            </Container>
        </>);
}

export default Poets;