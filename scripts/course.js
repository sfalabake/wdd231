const courses = [
    // This is a placeholder. I will update this once you send your array.
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false },
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true }
];

const courseContainer = document.getElementById('course-container');
const creditDisplay = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = "";

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        courseContainer.appendChild(card);
    });

    // Calculate total credits using reduce
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditDisplay.textContent = `The total credits for courses listed above is ${total}`;
}

// Initial display
displayCourses(courses);

// Button Listeners
document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('cse').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});
document.getElementById('wdd').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});