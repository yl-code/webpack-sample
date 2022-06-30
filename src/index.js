import './index.css';
import './login.less';
import { a } from './a';

import pic from '../public/images/logo.png';
console.log(pic);
const img = new Image();
img.src = pic;
img.width = 150;
img.height = 150;
const root = document.querySelector('#app');
root.appendChild(img);

console.log('hello yl', a);
