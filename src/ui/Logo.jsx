import styled from 'styled-components'

const StyledLogo = styled.div`
  text-align: center;
`

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`

const Logo = () => {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" loading="lazy" />
    </StyledLogo>
  )
}

export default Logo
