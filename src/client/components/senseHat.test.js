import { h } from 'preact'
import { shallow } from 'enzyme'
import MockedSocket from 'socket.io-mock'

import Checkbox from './checkbox'
import SenseHAT from './senseHat'
import LedMatrix from './ledMatrix'

describe('SenseHAT component', () => {
  test('throws an error when socket is null', () => {
    expect(() => shallow(<SenseHAT />)).toThrowError('Could not bind to socket')
  })

  describe('when socket is NOT null', () => {
    let mocket
    let wrapper

    beforeEach(() => {
      mocket = new MockedSocket()
      wrapper = shallow(<SenseHAT socket={mocket} />)
    })

    test('renders a LedMatrix', () => {
      expect(wrapper.find(LedMatrix).length).toEqual(1)
    })

    test('shows borders of matrix cells when board is toggled', () => {
      expect(wrapper.find(LedMatrix).prop('showCellBorders')).toBeFalsy()
      wrapper.find(Checkbox).dive().find('input').simulate('change')
      expect(wrapper.find(LedMatrix).prop('showCellBorders')).toBeTruthy()
    })

    test(`updates the matrix when 'updateMatrix' event is received through socket`, () => {
      const newMatrix = [1, 2, 3, 4]
      mocket.socketClient.emit('updateMatrix', newMatrix)
      expect(wrapper.state('matrix')).toEqual(newMatrix)
    })
  })
})
