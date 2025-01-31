import React, { useRef } from 'react';
import { BlogText } from './Text/BlogText';
import { BlogImage } from './Image/BlogImage';
import { BlogTextImage } from './TextImage/BlogTextImage';
import { EnhancedCarousel } from './Carousel/EnhancedCarousel';
import { CarouselSlide } from './Carousel/types';
import { ChapterNavigation } from './ChapterNavigation';
import { useAccordionContext } from '../Accordion/AccordionContext';
import { BlogTextCaroussel } from './TextCaroussel/BlogTextCaroussel';


export function BlogContent() {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const carouselSlides: CarouselSlide[] = [
    {
      type: 'image-only',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=2400',
      title: 'My Development Setup'
    },
    {
      type: 'image-text',
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=2400',
      title: 'Code Philosophy',
      description: "I believe in writing clean, maintainable code that solves real-world problems effectively. My approach focuses on scalability and user experience.",
      alignment: 'right'
    },
    {
      type: 'image-text',
      image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&q=80&w=2400',
      title: 'Always Learning',
      description: "Technology evolves rapidly, and I'm committed to staying at the forefront. Continuous learning and adaptation are key to delivering innovative solutions.",
      alignment: 'left'
    }
  ];


  const SimonSlides: CarouselSlide[] = [
    {
      type: 'image-only',
      image: 'https://drive.google.com/thumbnail?id=1I6k25sjfRN-vhWsRilOtIEGa5kQ2TQpY&sz=s1000',
      title: ''
    },
    {
      type: 'image-only',
      image: 'https://drive.google.com/thumbnail?id=1if6GJBlQptClE6ZkrbDSeE02fBpkZSRy&sz=s1000',
      title: ''
    },
    {
      type: 'image-only',
      image: 'https://drive.google.com/thumbnail?id=1K5zFxPeKHhtzwC2EvnnTfvdbKD0IJqeK&sz=s1000',
      title: ''
    },
    {
      type: 'image-only',
      image: 'https://drive.google.com/thumbnail?id=1x4hlfmsmeI6YLP9HatkKmBiA2Cr5d-Bz&sz=s1000',
      title: ''
    },
  ];


  const { expandedIndex } = useAccordionContext();
  // Vérifiez si l'index étendu est 2
  const isAccordionExpanded = expandedIndex === 2;
  
  
  return (
    <div className="rich-content relative h-full w-full">
      <div ref={contentRef} className="absolute inset-0 overflow-y-auto" style={{WebkitOverflowScrolling: "touch",}}>

        <div className={`max-w-5xl mx-auto px-6 h-full transition-[padding] duration-300 ease-in-out ${
            isAccordionExpanded ? 'py-20' : 'py-0'
          }`}>  
          
          <BlogText variant="h1">Bonjour !</BlogText>  
          <BlogTextImage
            src='https://drive.google.com/thumbnail?id=1I6k25sjfRN-vhWsRilOtIEGa5kQ2TQpY&sz=s1000' 
            alt='picture of Simon'
            caption="C'est moi !"
            imagePosition='left'
            imageWidth='1/3'
            useP={false}
            >
            <p>Je m'appelle <strong>Simon</strong>, j'ai 22 ans et suis titulaire d'un BUT en Informatique. Actuellement, je poursuis mes études en école de jeux vidéo au <strong>Gaming Campus de Paris</strong>.</p>

            <p>Je suis à la recherche :</p>
            <ul>
                <li><strong>D'un stage</strong> débutant en <strong>mai 2024</strong>, idéalement dans un studio de jeux vidéo au sein d'une équipe de développement, ou dans une entreprise travaillant avec les moteurs <strong>Unity</strong> ou <strong>Unreal Engine</strong> pour des projets variés.</li>
                <li><strong>D'une alternance</strong> dans le même domaine pour les deux prochaines années scolaires.</li>
            </ul>

            <p>Passionné par le développement de jeux vidéo, je suis une personne curieuse et motivée, prête à m'investir pleinement pour acquérir des compétences professionnelles solides. Mon enthousiasme et ma détermination me permettent de fournir un travail intensif afin de progresser dans cette voie qui me tient à cœur.</p>

            <p><strong>N'hésitez pas à me contacter !</strong></p>

          </BlogTextImage>

          
          <BlogText variant="h2" id="wip">Work In progress</BlogText>
          <p>Cette partie est encore en écriture</p>
        </div>
        
      </div>
      <ChapterNavigation contentRef={contentRef} />
      
    </div>
  );
}

/*
<EnhancedCarousel slides={carouselSlides} autoplay interval={5000} />
  
  
          <BlogTextImage
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=2400"
            alt="Developer at work"
            caption="Finding solutions through code"
            imagePosition="right"
          >
            My expertise spans across full-stack development, with a particular focus on creating 
            scalable web applications and intuitive user interfaces. I believe in writing clean, 
            maintainable code that solves real-world problems effectively.
          </BlogTextImage>
  
          <BlogText variant="h2" id="philosophy">Development Philosophy</BlogText>
  
          <BlogText variant="quote">
            &quot;The best way to predict the future is to create it.&quot; This quote has always guided my 
            approach to development and innovation.
          </BlogText>
  
          <BlogText>
            When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source 
            projects, or sharing my knowledge through technical writing and mentoring. I&apos;m always eager 
            to learn and grow, believing that every challenge is an opportunity to improve.
          </BlogText>
  
          <BlogText variant="h2" id="skills">Technical Skills</BlogText>
  
          <BlogImage
            src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&q=80&w=2400"
            alt="Code on screen"
            caption="Always learning, always growing"
            width="mid"
          />
  
          <BlogText variant="h2" id="projects">Notable Projects</BlogText>
  
          <BlogText>
            Throughout my career, I've had the opportunity to work on various challenging and exciting projects.
            Each project has contributed to my growth as a developer and helped me refine my skills.
          </BlogText>
  
          <BlogText variant="h2" id="future">Looking Forward</BlogText>
  
          <BlogText>
            The tech industry is constantly evolving, and I'm excited about the future of software development.
            I'm particularly interested in emerging technologies and their potential to solve real-world problems.
          </BlogText>
          <br/>
          <br/>
    */