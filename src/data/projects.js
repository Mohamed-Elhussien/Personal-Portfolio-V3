import sprintify from '../assets/images/sprintify.webp';
import amira from '../assets/images/amira-mousa.webp';
import nour from '../assets/images/noureldeen.webp';
import pixel from '../assets/images/pixel-bit.webp';
import mohamed from '../assets/images/my-portfolio.webp';


export const projects = [
  {
    id: 1,
    title: 'Sprintify',
    description: 'AI-powered project management workspace where teams plan, collaborate, and ship without the chaos.',
    image: sprintify,
    tags: ['React', 'Tailwind CSS', 'JavaScript','Node.js','Express.js','MongoDB','pnpm Workspaces'],
    featured: true,
    liveUrl: 'https://sprintify-client.vercel.app/',
    githubUrl: 'https://github.com/MersalHussin/Sprintify',
  },
  {
    id: 2,
    title: 'Visual Artist Portfolio',
    description: 'Visual artist portfolio showcasing original paintings exploring memory, landscape, and the human condition.',
    image: amira,
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    featured: false,
    liveUrl: 'https://amira-mousa.vercel.app/',
    githubUrl: 'https://github.com/Mohamed-Elhussien/Amira-Mousa',
  },
  {
    id: 3,
    title: 'Data Engineer Portfolio',
    description: 'Data Engineer portfolio showcasing scalable backend architectures and robust data pipelines.',
    image: nour,
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    featured: false,
    liveUrl: 'https://noureldeen.vercel.app/',
    githubUrl: 'https://github.com/Mohamed-Elhussien/Data-engineer-Portfolio',
  },
  {
    id: 4,
    title: 'Pixel Bit',
    description: 'A full-stack agency portfolio built by a trio—covering UI/UX design, interactive frontend, and scalable backend architecture.',
    image: pixel,
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    featured: false,
    liveUrl: 'https://pixel-bit-3.vercel.app/',
    githubUrl: 'https://github.com/Mohamed-Elhussien/bears',
  },
  {
    id: 5,
    title: 'Personal Portfolio V3 ',
    description: 'An interactive personal portfolio built with React and Tailwind CSS, featuring sleek dark mode UI, smooth animations, and clean code principles.',
    image: mohamed,
    tags: ['React', 'Tailwind CSS', 'JavaScript','GSAP'],
    featured: false,
    liveUrl: 'https://mohamed-elhussien.vercel.app/',
    githubUrl: 'https://github.com/Mohamed-Elhussien/Mohamed-Elhussien',
  },
]