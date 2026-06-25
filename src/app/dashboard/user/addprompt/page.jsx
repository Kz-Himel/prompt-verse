// TODO: replace with real DB fetch
// const { promptCount } = await getUserPromptCount(session.user.id);
"use client"

import AddPromptPage from "../../components/AddPromptPage";

const DUMMY_USER_PROMPT_COUNT = 1; // user er already add kora prompt count

const UserAddPromptPage = () => {
  return (
    <AddPromptPage
      role="user"
      currentCount={DUMMY_USER_PROMPT_COUNT}
    />
  );
};

export default UserAddPromptPage;