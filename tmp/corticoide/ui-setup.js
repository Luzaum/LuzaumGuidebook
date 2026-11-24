async (page) => {
 await page.route('**/src/components/AuthSessionProvider.tsx*', route => route.fulfill({contentType:'application/javascript',body:`export const AuthSessionProvider = ({children}) => children; export const useAuthSession = () => ({loading:false,isAuthenticated:true,session:null,user:{id:'corticoid-audit',email:'audit@example.test',user_metadata:{}},profile:{id:'corticoid-audit',name:'Auditoria',email:'audit@example.test',avatarUrl:''},refreshSession:async()=>{},logout:async()=>{}});`}));
 await page.goto('http://127.0.0.1:5173/conversor-corticoide');
}
