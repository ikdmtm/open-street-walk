import { useState } from "react";

export const useFlashMessage = () => {
  const [notice, setNotice] = useState("");
  const [alert, setAlert] = useState("");
  return { notice, setNotice, alert, setAlert };
};
