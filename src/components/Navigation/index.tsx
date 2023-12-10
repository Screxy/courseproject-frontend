import styled from 'styled-components'

export  interface StyledProps{
	background: string
}
const NavigationWrapper = styled.nav<StyledProps>`
background: red;
`
const Navigation = () => {
	return (
		<NavigationWrapper background={`b`}>
			<nav className="test">
				<a href="#">hello</a>
				<a href="#">hello</a>
				<a href="#">hello</a>
			</nav>
		</NavigationWrapper>
	);
};

export default Navigation;
