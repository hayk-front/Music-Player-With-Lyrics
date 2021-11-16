import styled from "styled-components";

export const Lyrics = styled.div`
    position: absolute;
    left: ${(props) => `${props.x}px`};
    bottom: ${(props) => `${props.y}px`};
    margin auto;
    color: #fff;
    font-family: monospace;
    font-weight: 700;
    font-size: 1.5vw;
    text-align: center;
    max-width: 65%;
`;
