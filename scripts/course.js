const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true // Set to true if completed
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
const creditTotal = document.querySelector('#total-credits');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        // Add "completed" class based on status
        card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        card.innerHTML = `<strong>${course.subject} ${course.number}</strong>`;
        courseContainer.appendChild(card);
    });

    // Dynamic credit calculation using reduce
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `Total Credits: ${total}`;
}

// Initial Render
displayCourses(courses);

// Filter Event Listeners
document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#cse').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.querySelector('#wdd').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});