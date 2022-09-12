import styled from "styled-components";
import React from 'react'
import { FaGithub } from "react-icons/fa";

export function Footer() {

    const FooterStyle = styled.footer`
    height: 100px;
    background-color: black;
    color: white;
    text-align: center;
    bottom: 0;
    position: fixed;
    width: 100%;
    
    `
    const FooterDiv = styled.div`
    display: flex;
    justify-content: space-around;
    color: white
    height: 50px;
    padding: 30px;
    align-items: center;
    `
    const FooterLink = styled.a`
    text-decoration: none;
    color: white;
    :hover {
        text-decoration: underline;
        color: white;
    }
    `

    return (
        <div>
            {/*   <FooterStyle>
                <FooterDiv>
                    <div><h6>Created by <a href="https://github.com/rokkomini" target={'_blank'}>Rokkomini</a></h6></div>
                    <div><h4><a className="" href="https://github.com/rokkomini" target="_blank" rel="noopener noreferrer"><FaGithub /> </a></h4></div>
                </FooterDiv>
            </FooterStyle> */}
            <FooterStyle>


                <FooterDiv>
                    <div>
                        <h6 className="text-muted">Created by <FooterLink href="https://github.com/rokkomini" target={'_blank'}>Rokkomini</FooterLink></h6>
                    </div>
                    <div>
                        <ul className="navbar-nav me-auto"><li><h1>
                            <FooterLink href="https://github.com/rokkomini" target="_blank" rel="noopener noreferrer"><FaGithub /> </FooterLink>
                        </h1></li></ul>
                    </div>
                </FooterDiv>



            </FooterStyle>
        </div>
    )
}
