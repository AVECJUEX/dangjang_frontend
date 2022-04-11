import React, { useState, useEffect} from "react";
import MainInfo from "./MainInfo";
import styled from "styled-components";
import TopInfo from "./TopInfo";

const Main = styled.section`
  padding-top: 0px;
  padding-bottom: unset;

  @media ${(props) => props.theme.mobile} {
    border-bottom: 1px solid #e3e3e3;
  }

  .Content {
    display: flex;
  }

  .Background {
    flex: 1;
    background: #f8f8f8;
  }

  section {
    background-color: #fff;
  }

  h1 {
    margin: 0px;
  }
`;

function zoomtest({ match }) {
  return (
    <>
      <Main>
        <div className="Content">
          <div className="Background">
            <section>
              <TopInfo match={match} />
              <MainInfo match={match} />
            </section>
          </div>
        </div>
      </Main>
    </>
  );
}

export default zoomtest;