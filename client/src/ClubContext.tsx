import React from "react";
import Club from "./components/Club";

export const ClubContext = React.createContext<Map<string, Club> | undefined>(undefined);