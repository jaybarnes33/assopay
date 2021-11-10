import React from "react";

export interface SetableContext<T> {
  data?: T;
  setData?: React.Dispatch<React.SetStateAction<T>>;
}
