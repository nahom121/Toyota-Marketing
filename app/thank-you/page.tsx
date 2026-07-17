"use client";

import { useEffect } from "react";

export default function ThankYou() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}
