
/* =========================
   DATA
   ========================= */

const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true, description: 'Basics of programming.' },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true, description: 'HTML, CSS, JS basics.' },
    { subject: 'CSE', number: 111, title: 'Functions', credits: 2, completed: true, description: 'Functions in programming.' },
    { subject: 'CSE', number: 210, title: 'Classes', credits: 2, completed: true, description: 'OOP concepts.' },
    { subject: 'WDD', number: 131, title: 'Dynamic Web', credits: 2, completed: true, description: 'Interactive websites.' },
    { subject: 'WDD', number: 231, title: 'Frontend I', credits: 2, completed: false, description: 'Advanced frontend development.' }
];

/* =========================
   ELEMENTS
   ========================= */

const courseContainer = document.querySelector('#course-container');
const creditTotalDisplay = document.querySelector('#total-credits');
const courseDetails = document.querySelector('#course-details');

/* =========================
   DISPLAY COURSES
   ========================= */

function displayCourses(list) {

    courseContainer.innerHTML = "";

    list.forEach(course => {

        const card = document.createElement('div');

        card.classList.add('course-card');
        card.classList.add(course.subject.toLowerCase());

        if (course.completed) {
            card.classList.add('completed');
        } else {
            card.classList.add('not-completed');
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
        `;

        card.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(card);
    });

    const total = list.reduce((sum, c) => sum + c.credits, 0);
    creditTotalDisplay.textContent = `Total Credits: ${total}`;
}

/* =========================
   MODAL
   ========================= */

function displayCourseDetails(course) {

    courseDetails.innerHTML = `
        <button id="closeModal" aria-label="Close modal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Status:</strong> ${course.completed ? "Completed" : "In Progress"}</p>
        <p>${course.description}</p>
    `;

    courseDetails.showModal();

    document.querySelector('#closeModal').onclick = () => {
        courseDetails.close();
    };
}

/* close on outside click */
courseDetails.addEventListener('click', (e) => {
    const rect = courseDetails.getBoundingClientRect();

    const outside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

    if (outside) courseDetails.close();
});

/* ESC key close */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && courseDetails.open) {
        courseDetails.close();
    }
});

/* =========================
   FILTERS
   ========================= */

const allBtn = document.querySelector('#all');
const cseBtn = document.querySelector('#cse');
const wddBtn = document.querySelector('#wdd');

function setActive(btn) {
    document.querySelectorAll('.filters button')
        .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

allBtn.addEventListener('click', () => {
    displayCourses(courses);
    setActive(allBtn);
});

cseBtn.addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
    setActive(cseBtn);
});

wddBtn.addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
    setActive(wddBtn);
});

/* =========================
   INIT
   ========================= */

displayCourses(courses);
setActive(allBtn);