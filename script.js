// Smooth scrolling and active link highlight
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Fetch XML and update content dynamically
fetch('data.xml')
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
    const profile = data.querySelector('profile');
    const name = profile.querySelector('name')?.textContent;
    const quote = profile.querySelector('quote')?.textContent;
    const location = profile.querySelector('location')?.textContent;
    const profileImage = profile.querySelector('profileImage')?.textContent;

    document.getElementById('name').textContent = name;
    document.getElementById('quote').textContent = quote;
    document.getElementById('location').textContent = location;
    document.getElementById('profileImage').src = profileImage;

    // Social media (Home + Contact)
    const iconClasses = { 
  facebook: "fab fa-facebook",
  instagram: "fab fa-instagram",
  tiktok: "fab fa-tiktok"
};
    const social = profile.querySelector('socialMedia');
    const homeSocial = document.getElementById('homeSocial');
    const contactSocial = document.getElementById('contactSocial');
    homeSocial.innerHTML = '';
    contactSocial.innerHTML = '';
    ['facebook', 'instagram', 'tiktok'].forEach(platform => {
      const url = social.querySelector(platform)?.textContent;
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.target = "_blank";
        a.innerHTML = `<i class="${iconClasses[platform]}"></i>`;
        homeSocial.appendChild(a.cloneNode(true));
        contactSocial.appendChild(a);
      }
    });

    // Projects
    const projects = data.querySelectorAll('portfolio > project');
    const projectsList = document.getElementById('projects');
    projectsList.innerHTML = '';
    projects.forEach(project => {
      const title = project.querySelector('title')?.textContent;
      const description = project.querySelector('description')?.textContent;
      const link = project.querySelector('link')?.textContent;

      const item = document.createElement('div');
      item.classList.add('project');
      item.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link}" target="_blank">View Project</a>
      `;
      projectsList.appendChild(item);
    });

    // Skills
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    data.querySelectorAll('skills > skill').forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill.textContent;
      skillsList.appendChild(li);
    });

    // Talents
    const talentsList = document.getElementById('talentsList');
    talentsList.innerHTML = '';
    data.querySelectorAll('talents > talent').forEach(talent => {
      const li = document.createElement('li');
      li.textContent = talent.textContent;
      talentsList.appendChild(li);
    });

    // Organizations
    const organizationsList = document.getElementById('organizationsList');
    organizationsList.innerHTML = '';
    data.querySelectorAll('organizations > organization').forEach(org => {
      const name = org.querySelector('name')?.textContent;
      const role = org.querySelector('role')?.textContent;
      const period = org.querySelector('period')?.textContent;

      const li = document.createElement('li');
      li.innerHTML = `<strong>${name}</strong><br>${role} (${period})`;
      organizationsList.appendChild(li);
    });

    // Services
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    data.querySelectorAll('services > service').forEach(service => {
      const title = service.querySelector('title')?.textContent;
      const description = service.querySelector('description')?.textContent;

      const div = document.createElement('div');
      div.classList.add('service');
      div.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
      servicesList.appendChild(div);
    });

    // Testimonials
    const testimonialsList = document.getElementById('testimonialsList');
    testimonialsList.innerHTML = '';
    data.querySelectorAll('testimonials > testimonial').forEach(testimonial => {
      const text = testimonial.querySelector('text')?.textContent;
      const author = testimonial.querySelector('author')?.textContent;

      const block = document.createElement('blockquote');
      block.innerHTML = `<p>${text}</p><footer>— ${author}</footer>`;
      testimonialsList.appendChild(block);
    });

    // Contact info
    const contact = data.querySelector('contact');
    document.getElementById('email').textContent = contact.querySelector('email')?.textContent;
    document.getElementById('email').href = `mailto:${contact.querySelector('email')?.textContent}`;
    document.getElementById('phone').textContent = contact.querySelector('phone')?.textContent;
  })
  .catch(err => console.error('Error loading XML:', err));
