import {
  depthFirst
} from './index'

describe('index', function () {
  it('should export classes', function (done) {
    if (!depthFirst) throw new Error('expecting depthFirst')
    done()
  })
})
