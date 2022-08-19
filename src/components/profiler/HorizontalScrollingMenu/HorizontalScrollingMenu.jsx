import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";

import "./globalStyles.css";
import usePreventBodyScroll from "./usePreventBodyScroll";
import Button from "@mui/material/Button";

// NOTE: embrace power of CSS flexbox!
import "./hideScrollbar.css";
// import "./firstItemMargin.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function HorizontalScrollingMenu({ itemsTable }) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <>
      <div className="containerItems" style={{ paddingTop: "100px", width: "80%" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {itemsTable.map((data) => {
              return (
                <span key={data._id} className="scrollItems">
                  <Button
                    className="paramétres_profiler"
                    size="large"
                    variant="contained"
                    color="secondary"
                  >
                    {data.Nom}
                  </Button>
                </span>
              );
            })}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

export default HorizontalScrollingMenu;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
