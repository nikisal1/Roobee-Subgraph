import { BigInt } from "@graphprotocol/graph-ts"
import {
  RoobeeToken,
  MinterAdded,
  MinterRemoved,
  Transfer,
  Approval
} from "../generated/RoobeeToken/RoobeeToken"
import { _MinterAdded, _MinterRemoved, _Transfer, _Approval } from "../generated/schema"

export function handleMinterAdded(event: MinterAdded): void {
  let minterAdded = _MinterAdded.load(event.params.account.toHex())

  if (minterAdded == null) {
    minterAdded = new _MinterAdded(event.params.account.toHex())
    minterAdded.count = BigInt.fromI32(0)
  }

  minterAdded.count = minterAdded.count + BigInt.fromI32(1)
  minterAdded.account = event.params.account
  minterAdded.save()
}

export function handleMinterRemoved(event: MinterRemoved): void {
  let minterRemoved = _MinterRemoved.load(event.params.account.toHex())

  if (minterRemoved == null) {
    minterRemoved = new _MinterRemoved(event.params.account.toHex())
    minterRemoved.count = BigInt.fromI32(0)
  }

  minterRemoved.count = minterRemoved.count + BigInt.fromI32(1)
  minterRemoved.account = event.params.account
  minterRemoved.save()
}

export function handleTransfer(event: Transfer): void {
  let transfer = _Transfer.load(event.params.value.toHex())

  if (transfer == null) {
    transfer = new _Transfer(event.params.value.toHex())
    transfer.count = BigInt.fromI32(0)
  }

  transfer.count = transfer.count + BigInt.fromI32(1)
  transfer.from = event.params.from
  transfer.to = event.params.to
  transfer.value = event.params.value
  transfer.save()
}

export function handleApproval(event: Approval): void {
  let approval = _Approval.load(event.params.value.toHex())

  if (approval == null) {
    approval = new _Approval(event.params.value.toHex())
    approval.count = BigInt.fromI32(0)
  }

  approval.count = approval.count + BigInt.fromI32(1)
  approval.owner = event.params.owner
  approval.spender = event.params.spender
  approval.value = event.params.value
  approval.save()
}
