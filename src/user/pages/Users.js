import React from "react";

import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "ul",
      name: "Bordea Radu",
      image:
        "https://travelbird-images.imgix.net/5b/cf/5bcfc302a6063ac933fc5a1d24d93615?auto=compress%2Cformat&crop=faces%2Cedges%2Ccenter&dpr=2&fit=crop&h=700&upscale=true&w=1050",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
