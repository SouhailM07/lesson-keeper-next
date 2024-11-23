"use client";

import AddNewItem, { AddNew_e } from "@/components/atoms/AddNewItem/AddNewItem";
import PageTitle from "@/components/atoms/PageTitle/PageTitle";
import ModulesContainer from "@/components/organisms/ModulesContainer/ModulesContainer";
import ModulesApiContextProvider from "@/context/ModulesApiContext/ModulesApiContext";
import { API_APP_URL } from "@/lib/API_APP_URL";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ModulesPage({
  seasonTitle,
  seasonId,
}: {
  seasonTitle: string;
  seasonId: string;
}) {
  return (
    <ModulesApiContextProvider seasonId={seasonId}>
      <ModulesContainer />
    </ModulesApiContextProvider>
  );
}
