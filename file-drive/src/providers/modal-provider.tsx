"use client";

import AlertModal from "@/components/modals/alert-modal";
import React, { useEffect, useState } from "react";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>
    <AlertModal />
  </>;
};

export default ModalProvider;
