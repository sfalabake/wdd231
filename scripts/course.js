const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true,
        description: 'Introduction to programming concepts and problem solving.'
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true,
        description: 'Basics of web development using HTML, CSS, and JavaScript.'
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true,
        description: 'Focus on functions and modular programming.'
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: true,
        description: 'Object-oriented programming concepts.'
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true,
        description: 'Interactive web pages using JavaScript.'
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false,
        description: 'Advanced frontend development techniques.'
    }
];

const courseContainer = document.querySelector('#course-container');
const creditTotalDisplay = document.querySelector('#total-credits');
const courseDetails = document.querySelector('#course-details');

/* =========================
   DISPLAY COURSES
   ========================= */

function displayCourses(filteredCourses) {

    courseContainer.innerHTML = "";

    filteredCourses.forEach(course => {

        const card = document.createElement('div');
        card.classList.add('course-card');

        if (course.completed) {
            card.classList.add('completed');
        } else {
            card.classList.add('not-completed');
        }

        const courseTitle = document.createElement('h3');
        courseTitle.textContent = `${course.subject} ${course.number}`;

        const courseName = document.createElement('p');
        courseName.textContent = course.title;

        card.appendChild(courseTitle);
        card.appendChild(courseName);

        /* =========================
           MODAL TRIGGER
           ========================= */
        card.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(card);
    });

    /* =========================
       TOTAL CREDITS
       ========================= */
    const totalCredits = filteredCourses.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotalDisplay.textContent = `Total Credits: ${totalCredits}`;
}

/* =========================
   MODAL FUNCTION
   ========================= */

function displayCourseDetails(course) {

    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Status:</strong> ${course.completed ? "Completed" : "In Progress"}</p>
        <p>${course.description}</p>
    `;

    courseDetails.showModal();

    const closeModal = document.querySelector('#closeModal');

    closeModal.onclick = () => {
        courseDetails.close();
    };
}

/* =========================
   CLOSE MODAL (OUTSIDE CLICK)
   ========================= */

courseDetails.addEventListener('click', (e) => {
    if (e.target === courseDetails) {
        courseDetails.close();
    }
});

/* =========================
   ESC KEY CLOSE
   ========================= */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        courseDetails.close();
    }
});

/* =========================
   INITIAL RENDER
   ========================= */

displayCourses(courses);

/* =========================
   FILTER BUTTONS
   ========================= */

document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

document.querySelector('#wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});