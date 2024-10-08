/** @jsxImportSource @emotion/react */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link to={"/"}>
        <img
          css={css`
            filter: hue-rotate(72deg);
          `}
          className="h-8 w-auto"
          src="/assets/images/maze.png"
          alt="IAmAMaze.me"
        />
      </Link>
    </div>
  );
}
