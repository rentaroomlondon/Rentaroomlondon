import React, { Suspense } from "react";
import ForgetPassword from "./components/ForgetPassword";

const page = () => {
  return (
    <div className="font-sans">
      <Suspense fallback={<div>Loading...</div>}>
        <ForgetPassword />
      </Suspense>
    </div>
  );
};

export default page;