import React from "react";

import { useParams } from "react-router-dom";

const NewTransaction = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Editar transaction #{id}</h2>
    </div>
  );
};

export default NewTransaction;
