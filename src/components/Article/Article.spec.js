import React from 'react'
import { shallow } from 'enzyme'
import Article from './Article'

const setup = props => {
  const component = shallow(
    <Article{...props} />
  )

  return {
    component: component
  }
}

describe('Article component', () => {
  const name = 'Test Product';

  it('should render name', () => {
    const { component } = setup({ name })
    expect(component.text()).toBe(name)
  })
})
