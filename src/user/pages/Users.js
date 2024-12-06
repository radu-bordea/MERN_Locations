import React from "react";

import UserList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "ul",
      name: "Bordea Radu",
      image:
        "https://www.psdgraphics.com/wp-content/uploads/2010/04/web-user.jpg",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
