import { useEffect, useState } from "react";

/**Creo un custom hook para hacer dinamico el titulo de la pagina*/

/**
 *
 * @param {string} title
 * El titulo que se desa mostrar el hook lo añadira automaticamente seguido con el sufrijo blackbox
 */


export const useDocumentTitle = (title: string) => {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = `BlackBox - ${documentTitle}`;
  }, [documentTitle]);

  const updateTitle = (newTitle: string) => {
    setDocumentTitle(newTitle);
  };

  return { documentTitle, updateTitle };
};
