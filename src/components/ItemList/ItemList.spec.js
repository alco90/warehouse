import React from 'react'
import { shallow } from 'enzyme'
import ItemList from './ItemList'

const setup = props => {
  const component = shallow(
    <ItemList name={props.name}>{props.children}</ItemList>
  )

  return {
    component: component,
    children: component.children().at(1),
    h3: component.find('h3')
  }
}

describe('ItemList component', () => {
  it('should render name', () => {
    const { h3 } = setup({ name: 'Test Products' })
    expect(h3.text()).toMatch(/^Test Products$/)
  })

  it('should render children', () => {
    const { children } = setup({ name: 'Test Products', children: 'Test Children' })
    expect(children.text()).toMatch(/^Test Children$/)
  })
})
