// components/header/user-card/UserCard.tsx

import { UserAvatar } from "./user-avatar"
import { BigDate } from "./BigDate"
import { ShapesBG } from "./ShapesBG"

export function UserCard() {
  return (
    <>
      <div className="">
        <UserAvatar />
        <ShapesBG />
      </div>
      <BigDate />
    </>
  )
}

