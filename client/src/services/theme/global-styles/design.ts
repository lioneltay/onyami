import { css } from "styled-components"

const BORDER_RADIUS_SMALL = 4
const BORDER_RADIUS_LARGE = 12

export default css`
  .rounded {
    border-radius: ${BORDER_RADIUS_SMALL}px;
  }

  .rounded-lg {
    border-radius: ${BORDER_RADIUS_LARGE}px;
  }
`
