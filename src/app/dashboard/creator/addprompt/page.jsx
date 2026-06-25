// Creator er kono limit nai, tai currentCount matter kore na
// but pass kore rakha bhalo practice (analytics e kaaje lagbe)
"use client"

import AddPromptPage from "../../components/AddPromptPage";

const CreatorAddPromptPage = () => {
  return (
    <AddPromptPage
      role="creator"
      currentCount={0}
    />
  );
};

export default CreatorAddPromptPage;