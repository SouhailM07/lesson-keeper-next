"use client";
import Countup from "react-countup";
export default function CounterUp({ end }) {
  return <Countup start={0} end={end} duration={10} />;
}
