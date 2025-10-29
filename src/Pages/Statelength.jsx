import React, { useState } from "react";
import Dask from "../Dashbord/DesComponant/Dask";
import Application from "../Dashbord/DesComponant/Application";

const Statelength = () => {
  const [totalApplications, setTotalApplications] = useState(0);

  return (
    <div className="p-6">
      {/* Show total in Dask */}
      <Dask totalApplications={totalApplications} />

      {/* Update total in Application */}
      <Application setTotalApplications={setTotalApplications} />
    </div>
  );
};

export default Statelength;

