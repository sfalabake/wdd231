const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.querySelector('#course-container');
const creditTotalDisplay = document.querySelector('#total-credits');

/**
 * Renders the course cards and updates the total credits display.
 * @param {Array} filteredCourses - The list of courses to display.
 */
function displayCourses(filteredCourses) {
    // 1. Clear the current content
    courseContainer.innerHTML = "";

    // 2. Loop through the array and create elements
    filteredCourses.forEach(course => {
        const card = document.createElement('div');

        // Apply classes for styling and mark completed courses
        card.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;

        // Set the internal HTML (showing Subject and Number)
        card.innerHTML = `<span>${course.subject} ${course.number}</span>`;

        courseContainer.appendChild(card);
    });

    // 3. Calculate total credits for the displayed courses using reduce
    const totalCredits = filteredCourses.reduce((accumulator, course) => {
        return accumulator + course.credits;
    }, 0);

    // 4. Update the credit display text
    creditTotalDisplay.textContent = `The total credits for the courses listed above is ${totalCredits}`;
}

// Initial display call to show all courses on page load
displayCourses(courses);

// Button event listeners for filtering
document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#cse').addEventListener('click', () => {
    const cseList = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseList);
});

document.querySelector('#wdd').addEventListener('click', () => {
    const wddList = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddList);
});