import {defineConfig} from 'vite';
import base from '../vite.config';
export default defineConfig(async env => {
 const config=await base(env);
 return {...config,server:{...config.server,port:5188,strictPort:true,hmr:false}};
});
