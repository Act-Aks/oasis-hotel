import { createContext, useContext, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import useOutsideClickHandler from '../hooks/useOutsideClickHandler'

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${props => props.position.x}px;
  top: ${props => props.position.y}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`

const MenusContext = createContext(null)

const useMenus = () => {
  const menusContext = useContext(MenusContext)

  if (!menusContext) throw new Error('Menus context not found')

  return menusContext
}

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState(null)

  const contextValues = useMemo(
    () => ({
      openId,
      close: () => setOpenId(''),
      open: setOpenId,
      position,
      setPosition,
    }),
    [openId, position],
  )

  return <MenusContext.Provider value={contextValues}>{children}</MenusContext.Provider>
}

const Toggle = ({ id }) => {
  const { open, openId, close, setPosition } = useMenus()

  const handleClick = e => {
    const closestButtonRect = e.target.closest('button').getBoundingClientRect()
    setPosition({
      x: window.innerWidth - closestButtonRect.width - closestButtonRect.x,
      y: closestButtonRect.height + closestButtonRect.y + 8,
    })
    !openId || openId !== id ? open(id) : close()
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

const List = ({ children, id }) => {
  const { openId, position, close } = useMenus()
  const { ref } = useOutsideClickHandler({ handler: close })

  if (openId !== id) return null

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  )
}

const Button = ({ children, icon, onClick }) => {
  const { close } = useMenus()

  const handleClick = () => {
    onClick?.()
    close()
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
Menus.Menu = Menu

export default Menus
