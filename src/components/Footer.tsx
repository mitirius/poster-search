import * as React from "react";
import "./Footer.css";

interface Props {
  pageNum: number;
  prevClicked(e: React.MouseEvent<HTMLElement>): void;
  nextClicked(e: React.MouseEvent<HTMLElement>): void;
}

export default function Footer({ pageNum, prevClicked, nextClicked }: Props) {
  return (
    <div className="footer">
      {pageNum > 0 && (
        <a href="" className="footer__previous" onClick={prevClicked}>
          <i className="fas fa-angle-left fa-lg footer__previous--left" />
          previous
        </a>
      )}
      <a href="" className="footer__next" onClick={nextClicked}>
        next
        <i className="fas fa-angle-right fa-lg footer__next--right" />
      </a>
    </div>
  );
}
