import { OverlayScrollbarsComponent, useOverlayScrollbars } from "overlayscrollbars-react";
import 'overlayscrollbars/overlayscrollbars.css';
import css from "./Wrapper.module.less";
import { useEffect, useRef } from "react";


type WrapperProps = {
  children: JSX.Element | JSX.Element[],
  className?: string,
  containerRef?: React.LegacyRef<HTMLDivElement> | undefined,
}

export const Wrapper = (props: WrapperProps) => {
  return (
    <div
      ref={props.containerRef}
      className={`${css["Wrapper"]}`}
    >
      {props.children}
    </div>
  )
}
