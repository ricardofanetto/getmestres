export default {
  port: process.env.PORT || 3333,
  secretyKey: process.env.SECRETYKEY || 'f5ccc0f3-cbb6-4788-b4c8-403c22cd110f',
  publicRoutes: process.env.PUBLICROUTES || [
    'users/create',
    'users/auth', 
    'customer/create'
  ]
}