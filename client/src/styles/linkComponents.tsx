import { forwardRef } from 'react'
import { Link as ReactRouterLink, NavLink as ReactRouterNavLink } from 'react-router-dom'

import { LinkProps as MuILinkProps } from '@mui/material'

export const LinkComponent = forwardRef<HTMLAnchorElement, MuILinkProps>(({ href, color, ...props }, ref) => {
  return <ReactRouterLink ref={ref} to={href || ''} color={color as string} {...props} />
})

LinkComponent.displayName = 'LinkComponent'

export const NavLinkComponent = forwardRef<HTMLAnchorElement, MuILinkProps>(({ href, color, ...props }, ref) => {
  return <ReactRouterNavLink ref={ref} to={href || ''} color={color as string} {...props} />
})

NavLinkComponent.displayName = 'NavLinkComponent'
