import React, { Fragment } from "react"

import { Divider, Text } from "lib/components"

type HeaderProps = Stylable

export default ({ style, className }: HeaderProps) => {
  return (
    <div className={className} style={style}>
      <div className="p-4">
        <Text variant="h5">Edit Page</Text>
      </div>

      <Divider />
    </div>
  )
}
