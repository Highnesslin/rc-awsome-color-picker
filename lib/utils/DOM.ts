import { SyntheticEvent } from "react"

export const stopReactEventPropagation = (e: SyntheticEvent) => {
  e.stopPropagation()
  e.nativeEvent.stopImmediatePropagation()
}
