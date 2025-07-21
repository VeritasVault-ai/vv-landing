import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

function ExampleComponent() {
  return <button>Click me</button>
}

describe('ExampleComponent', () => {
  it('renders the button', () => {
    render(<ExampleComponent />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
}) 