import { validationCloudDomain } from '@/constants/config'
import { Chain, createPublicClient, webSocket } from 'viem'

const transport = webSocket(
  `wss://${validationCloudDomain}/v1/wss/${process.env.NEXT_PUBLIC_VALIDATION_CLOUD_KEY}`
)

export function getWebsocketClient(chain?: Chain) {
  return createPublicClient({ chain, transport })
}
