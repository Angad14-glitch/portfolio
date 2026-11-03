require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/database');
const Profile = require('./src/models/Profile');
const Project = require('./src/models/Project');
const Skill = require('./src/models/Skill');

const seedData = async () => {
  try {
    await connectDB();
    
    await Promise.all([
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({})
    ]);
    console.log('Cleared existing data');

    const profile = await Profile.create({
      name: 'Angad Paswan',
      title: 'Full Stack Developer',
      bio: 'I am a passionate Full Stack Developer with expertise in building scalable web applications. I love creating elegant solutions to complex problems and continuously learning new technologies.\n\nWhen I\'m not coding, you can find me exploring new tech trends, contributing to open source, or sharing knowledge through technical writing.',
      email: 'angadpaswanap316960@gmail.com',
      phone: '+91 9372280226',
      location: 'India',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angadpaswan',
      resumeUrl: 'https://example.com/resume.pdf',
      socialLinks: {
        github: 'https://github.com/Angad14-glitch',
        linkedin: 'https://www.linkedin.com/in/angad-paswan-7a8767330/',
        twitter: 'https://twitter.com/angad',
        website: 'https://angad.dev'
      },
      isActive: true
    });
    console.log('Created profile:', profile.name);

    const projects = await Project.insertMany([
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, payment integration, and admin dashboard. Built with React, Node.js, Express, and MongoDB.',
        shortDescription: 'Full-stack e-commerce platform with payment integration',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        category: 'web',
        status: 'completed',
        featured: true,
        images: [
          { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', alt: 'E-commerce dashboard' }
        ],
        links: {
          live: 'https://ecommerce-demo.example.com',
          github: 'https://github.com/Angad14-glitch/ecommerce-platform'
        },
        order: 1,
        isActive: true
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team workspaces, drag-and-drop boards, and notifications. Features include due dates, labels, comments, and file attachments.',
        shortDescription: 'Real-time collaborative task manager with Kanban boards',
        technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Prisma'],
        category: 'web',
        status: 'completed',
        featured: true,
        images: [
          { url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800', alt: 'Task management board' }
        ],
        links: {
          live: 'https://taskmanager.example.com',
          github: 'https://github.com/Angad14-glitch/task-manager'
        },
        order: 2,
        isActive: true
      },
      {
        title: 'Weather Mobile App',
        description: 'A cross-platform mobile weather application with location-based forecasts, severe weather alerts, interactive maps, and historical data. Built with React Native and Expo.',
        shortDescription: 'Cross-platform weather app with real-time alerts',
        technologies: ['React Native', 'Expo', 'TypeScript', 'OpenWeather API', 'React Navigation'],
        category: 'mobile',
        status: 'completed',
        featured: true,
        images: [
          { url: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800', alt: 'Weather app screens' }
        ],
        links: {
          github: 'https://github.com/Angad14-glitch/weather-app'
        },
        order: 3,
        isActive: true
      },
      {
        title: 'REST API Boilerplate',
        description: 'A production-ready REST API boilerplate with authentication, validation, rate limiting, logging, testing, and documentation. Follows best practices for scalability and maintainability.',
        shortDescription: 'Production-ready Node.js API boilerplate',
        technologies: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Jest', 'Swagger'],
        category: 'api',
        status: 'completed',
        featured: false,
        images: [
          { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', alt: 'API documentation' }
        ],
        links: {
          github: 'https://github.com/Angad14-glitch/api-boilerplate'
        },
        order: 4,
        isActive: true
      },
      {
        title: 'Portfolio Website',
        description: 'This personal portfolio website built with a modern tech stack featuring a Node.js/Express backend, MongoDB database, and a responsive vanilla JavaScript frontend.',
        shortDescription: 'Full-stack personal portfolio with CMS-like backend',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
        category: 'web',
        status: 'completed',
        featured: true,
        images: [
          { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800', alt: 'Portfolio website' }
        ],
        links: {
          live: 'https://angad.dev',
          github: 'https://github.com/Angad14-glitch/portfolio'
        },
        order: 5,
        isActive: true
      },
      {
        title: 'Real-time Chat Application',
        description: 'A real-time messaging application with private chats, group conversations, message reactions, file sharing, and end-to-end encryption. Built with WebSocket technology.',
        shortDescription: 'Encrypted real-time chat with groups and reactions',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis', 'Docker'],
        category: 'web',
        status: 'in-progress',
        featured: false,
        images: [],
        links: {
          github: 'https://github.com/Angad14-glitch/chat-app'
        },
        order: 6,
        isActive: true
      }
    ]);
    console.log(`Created ${projects.length} projects`);

    const skills = await Skill.insertMany([
      { name: 'JavaScript', category: 'frontend', proficiency: 95, icon: '🟨', color: '#f7df1e', order: 1 },
      { name: 'TypeScript', category: 'frontend', proficiency: 90, icon: '🔷', color: '#3178c6', order: 2 },
      { name: 'React', category: 'frontend', proficiency: 92, icon: '⚛️', color: '#61dafb', order: 3 },
      { name: 'Next.js', category: 'frontend', proficiency: 85, icon: '▲', color: '#000000', order: 4 },
      { name: 'HTML/CSS', category: 'frontend', proficiency: 95, icon: '🌐', color: '#e34f26', order: 5 },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 90, icon: '🎨', color: '#06b6d4', order: 6 },
      { name: 'Node.js', category: 'backend', proficiency: 90, icon: '🟢', color: '#339933', order: 1 },
      { name: 'Express.js', category: 'backend', proficiency: 92, icon: '🚂', color: '#000000', order: 2 },
      { name: 'Python', category: 'backend', proficiency: 80, icon: '🐍', color: '#3776ab', order: 3 },
      { name: 'REST APIs', category: 'backend', proficiency: 95, icon: '🔌', color: '#ff6c37', order: 4 },
      { name: 'GraphQL', category: 'backend', proficiency: 75, icon: '📊', color: '#e10098', order: 5 },
      { name: 'MongoDB', category: 'database', proficiency: 88, icon: '🍃', color: '#47a248', order: 1 },
      { name: 'PostgreSQL', category: 'database', proficiency: 85, icon: '🐘', color: '#336791', order: 2 },
      { name: 'Redis', category: 'database', proficiency: 80, icon: '🔴', color: '#dc382d', order: 3 },
      { name: 'Prisma', category: 'database', proficiency: 85, icon: '🔮', color: '#2d3748', order: 4 },
      { name: 'Docker', category: 'devops', proficiency: 85, icon: '🐳', color: '#2496ed', order: 1 },
      { name: 'AWS', category: 'devops', proficiency: 75, icon: '☁️', color: '#ff9900', order: 2 },
      { name: 'CI/CD', category: 'devops', proficiency: 80, icon: '🔄', color: '#4285f4', order: 3 },
      { name: 'Kubernetes', category: 'devops', proficiency: 70, icon: '☸️', color: '#326ce5', order: 4 },
      { name: 'Git', category: 'tools', proficiency: 95, icon: '📝', color: '#f05032', order: 1 },
      { name: 'VS Code', category: 'tools', proficiency: 95, icon: '💻', color: '#007acc', order: 2 },
      { name: 'Postman', category: 'tools', proficiency: 90, icon: '📮', color: '#ff6c37', order: 3 },
      { name: 'Figma', category: 'tools', proficiency: 75, icon: '🎨', color: '#f24e1e', order: 4 },
      { name: 'Problem Solving', category: 'soft-skills', proficiency: 90, icon: '🧩', color: '#8b5cf6', order: 1 },
      { name: 'Communication', category: 'soft-skills', proficiency: 88, icon: '💬', color: '#ec4899', order: 2 },
      { name: 'Team Leadership', category: 'soft-skills', proficiency: 85, icon: '👥', color: '#f59e0b', order: 3 },
      { name: 'Mentoring', category: 'soft-skills', proficiency: 80, icon: '🎓', color: '#10b981', order: 4 }
    ]);
    console.log(`Created ${skills.length} skills`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();