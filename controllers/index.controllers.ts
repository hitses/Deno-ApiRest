import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [
  {
    id: "1",
    name: "Jerónimo Gascón",
  },
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "succesful Query",
    users,
  };
};

export const getUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  const userFound = users.find((user) => user.id === params.id);
  if (userFound) {
    response.status = 200;
    response.body = {
      message: "You got a single user",
      userFound,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  }
};

interface userBody {
  id: string;
  name: string;
}

export const createUser = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body: Body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Body is required",
    };
  } else {
    const newUser: userBody = body.value;
    newUser.id = v4.generate();

    users.push(newUser);

    response.status = 200;
    response.body = {
      message: "New user created",
      newUser,
    };
  }
};

export const updateUser = () => {};

export const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "User deleted successfully",
    users,
  };
};
