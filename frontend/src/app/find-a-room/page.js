import React, { Suspense } from "react";
import PropertySearch from "./components/PropertySearch";
 
const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PropertySearch />
      </Suspense>
    </div>
  );
};

export default page;