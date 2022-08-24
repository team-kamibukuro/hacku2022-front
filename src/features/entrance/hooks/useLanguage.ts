import React, { useCallback } from "react";
import { LANGUAGES } from "@/common/constants";
import { useDispatch } from "react-redux";
import { editCurrentUserLanguage, selectCurrentUser } from "@/slices/playSlice";
import { useSelector } from "react-redux";

const useLanguage = () => {
  const dispatch = useDispatch();

  const items = LANGUAGES.map((language, index) => {
    return {
      value: index,
      label: language,
    };
  });

  const currentUser = useSelector(selectCurrentUser);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);
      dispatch(editCurrentUserLanguage({ language: LANGUAGES[value] }));
    },
    []
  );

  return { items, handleChange };
};

export default useLanguage;
