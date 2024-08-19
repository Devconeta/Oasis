import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { PaperCreated } from "../generated/PaperFactory/PaperFactory"

export function createPaperCreatedEvent(
  paper: Address,
  owner: Address
): PaperCreated {
  let paperCreatedEvent = changetype<PaperCreated>(newMockEvent())

  paperCreatedEvent.parameters = new Array()

  paperCreatedEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromAddress(paper))
  )
  paperCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return paperCreatedEvent
}
