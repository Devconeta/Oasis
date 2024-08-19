
import { PaperCreated as PaperCreatedEvent } from "../generated/PaperFactory/PaperFactory"
import { PaperCreated } from "../generated/schema"
import { Paper } from '../generated/templates'

export function handlePaperCreated(event: PaperCreatedEvent): void {
  let entity = new PaperCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.paper = event.params.paper
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  Paper.create(event.params.paper)
}