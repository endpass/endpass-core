import CrossWindowBroadcaster, { privateMethods } from '@/CrossWindowBroadcaster';

describe('CrossWindowBroadcaster class', () => {
  let bus

  beforeEach(() => {
    bus = {
      addEventListener: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('instance', () => {
    it('should throw error if broadcast method is not provided', () => {
      expect(() => {
        /* eslint-disable-next-line */
        new CrossWindowBroadcaster()
      }).toThrow()
    })
  })

  describe('private methods', () => {
    let broadcaster

    beforeEach(() => {
      broadcaster = new CrossWindowBroadcaster({
        method: 'foo',
        bus
      })
    })

    describe('setupMessagesListener', () => {
      it('should add event listener to given bus', () => {
        expect(bus.addEventListener).toBeCalledWith('message', expect.any(Function))
      })
    })

    describe('onReceiveMessage', () => {
      it('should handle messages with defined type and passed method', () => {
        const message = {
          data: {
            messageType: 'endpass-cw-msgr',
            method: 'foo'
          }
        }

        broadcaster[privateMethods.sendBroadcastMessage] = jest.fn()
        broadcaster[privateMethods.onReceiveMessage](message)

        expect(broadcaster[privateMethods.sendBroadcastMessage]).toBeCalledWith(message.data)
      })

      it('should not handle messages without defined type', () => {
        const message = {
          data: {
            messageType: 'blabla',
            method: 'foo'
          }
        }

        broadcaster[privateMethods.sendBroadcastMessage] = jest.fn()
        broadcaster[privateMethods.onReceiveMessage](message)

        expect(broadcaster[privateMethods.sendBroadcastMessage]).not.toBeCalled()
      })

      it('should not handle messages without passed method', () => {
        const message = {
          data: {
            messageType: 'endpass-cw-msgr',
            method: 'bar'
          }
        }

        broadcaster[privateMethods.sendBroadcastMessage] = jest.fn()
        broadcaster[privateMethods.onReceiveMessage](message)

        expect(broadcaster[privateMethods.sendBroadcastMessage]).not.toBeCalled()
      })
    })

    describe('sendBroadcastMessage', () => {
      const message = {
        data: {
          messageType: 'endpass-cw-msgr',
          method: 'bar'
        }
      }
      let messengerA
      let messengerB

      beforeEach(() => {
        messengerA = {
          send: jest.fn()
        }
        messengerB = {
          send: jest.fn()
        }
      })

      it('should send passed message data to all messengers', () => {
        broadcaster.messengers = [messengerA, messengerB]

        broadcaster[privateMethods.sendBroadcastMessage](message.data)

        expect(messengerA.send).toBeCalledWith(message.data.method, message.data)
        expect(messengerB.send).toBeCalledWith(message.data.method, message.data)
      })

      it('should not do anything if messengers are empty', () => {
        broadcaster[privateMethods.sendBroadcastMessage](message)

        expect(messengerA.send).not.toBeCalled()
        expect(messengerB.send).not.toBeCalled()
      })
    })
  })

  describe('public methods', () => {
    let messengerA
    let messengerB

    beforeEach(() => {
      messengerA = {
        send: jest.fn()
      }
      messengerB = {
        send: jest.fn()
      }
    })

    describe('pushMessengers', () => {
      it('should push given messenger to the broadcaster context', () => {
        const broadcaster = new CrossWindowBroadcaster({
          method: 'foo'
        })

        broadcaster.pushMessengers(messengerA)
        broadcaster.pushMessengers([messengerB])

        expect(broadcaster.messengers).toEqual([messengerA, messengerB])
      })
    })
  })
});
