async (page) => {
 await page.route('**/src/components/AuthSessionProvider.tsx*', route => route.fulfill({contentType:'application/javascript',body:`export const AuthSessionProvider = ({children}) => children; export const useAuthSession = () => ({loading:false,isAuthenticated:true,session:null,user:{id:'mobile-audit',email:'audit@example.test',user_metadata:{}},profile:{id:'mobile-audit',name:'Auditoria mobile',email:'audit@example.test',avatarUrl:''},refreshSession:async()=>{},logout:async()=>{}});`}));
 await page.goto('http://localhost:5173/consulta-vet');
 await page.waitForTimeout(1500);
 console.log(await page.locator('body').innerText());
}
