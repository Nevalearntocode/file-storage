"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  image: string;
};

const UserAvatar = ({ image }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
